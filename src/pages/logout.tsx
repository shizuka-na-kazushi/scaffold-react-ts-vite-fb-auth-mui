import { useEffect, useContext } from 'react';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../fb/firebase'
import { AuthContext } from '../components/authProvider';

const Logout = () => {
    const navigate = useNavigate()
    const { authState } = useContext(AuthContext)

    useEffect(() => {
        const logout = async () => {
            await signOut(auth)
            console.log('logout done! going to home')
            navigate('/')
        }

        logout()
    }, [authState, navigate])

    return <div>Logout...</div>
}

export default Logout
