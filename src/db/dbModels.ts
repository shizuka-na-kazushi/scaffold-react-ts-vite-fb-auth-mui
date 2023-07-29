import {
    setDoc, getDoc, updateDoc,
    doc,
} from "firebase/firestore"

import { createUserWithEmailAndPassword, updateProfile, User } from "firebase/auth"
import { db, auth } from '../fb/firebase'

export type ModelDataId = string

/************************************************************************** */
/* Model User
/************************************************************************** */

export type ModelUser = {
    name: string | null,
    email: string | null,
    uid: ModelDataId,
    isAdministrator?: boolean,
}

export const Model_createFbUser = async (displayName: string, email: string, password: string): Promise<ModelDataId> => {

    const storeInitialUserEntry = async (user: User): Promise<ModelDataId> => {
        if (user) {
            const userData: ModelUser = {
                name: user.displayName,
                email: user.email,
                uid: user.uid,
            };
            await setDoc(doc(db, 'Users', user.uid), userData);
            return Promise.resolve(user.uid)
        }
        return Promise.resolve('')
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        await updateProfile(userCredential.user, { displayName: displayName })
        // await sendEmailVerification(userCredential.user)
        return storeInitialUserEntry(userCredential.user)
    }
    catch (error) {
        return Promise.reject(error);
    }
}

export const Model_getUser = async (uid: ModelDataId): Promise<ModelUser | null> => {

    const snapshot = await getDoc(doc(db, 'Users', uid))
    if (snapshot.exists()) {
        return Promise.resolve(snapshot.data() as ModelUser)
    }

    return Promise.resolve(null)
}

export const Model_grantAdmin = async (uid: ModelDataId): Promise<boolean> => {
    const docRef = await doc(db, 'Users', uid)
    await updateDoc(docRef, {
        isAdministrator: true,
    })
    return Promise.resolve(true)
}