import React from 'react';
import { createContext, useState, useEffect } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from '../fb/firebase';
import { ModelUser } from '../db/dbModels';

export enum AuthLoginState {
  Waiting, NotAuthAuthorized, Authorized,
}

type AuthContextType = {
  authState: AuthLoginState,
  currentUser: User | null,
  currentUserInfo: ModelUser | null,
}

type AuthProviderProps = {
  children: React.ReactNode
}

export const AuthContext = createContext<AuthContextType>({ authState: AuthLoginState.Waiting, currentUser: null, currentUserInfo: null });

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authInfo, setAuthInfo] = useState<AuthContextType>({ authState: AuthLoginState.Waiting, currentUser: null, currentUserInfo: null })

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {

      console.log('#### onAuthStateChanged + ' + (user ? user.uid : '(invalid uid)'))

      if (user) {
        try {
          const snapshot = await getDoc(doc(db, 'Users', user.uid))
          if (snapshot.exists()) {
            console.log('#### setAuthInfo is going to be called with Authorized.')
            setAuthInfo({
              authState: AuthLoginState.Authorized,
              currentUser: user,
              currentUserInfo: snapshot.data() as ModelUser,
            })
          }

        } catch (error) {
          console.log('causing error while getting user data (firestore)' + error)
        }
      } else {
        console.log('#### setAuthInfo is going to be called with NotAuthAuthorized.')
        setAuthInfo({
          authState: AuthLoginState.NotAuthAuthorized,
          currentUser: null,
          currentUserInfo: null
        })
      }

      return () => {
        console.log('### AuthProvider?? going to unscribe onAuthStateChanged!?')
        unsubscribe();
      }
    })
  }, [])

  return (
    <AuthContext.Provider value={{ authState: authInfo.authState, currentUser: authInfo.currentUser, currentUserInfo: authInfo.currentUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
}

// const useAuth = () => useContext(AuthContext);

export default AuthProvider;
