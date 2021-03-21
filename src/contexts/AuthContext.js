import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [reqError, setReqError] = useState();
    const [loading, setLoading] = useState(true);

    function signUp(email, password) {
        setReqError('');
        return auth.createUserWithEmailAndPassword(email, password).catch(err => setReqError(err));
    }

    function logIn(email, password) {
        setReqError('');
        return auth.signInWithEmailAndPassword(email, password).catch(err => setReqError(err));
    }

    function logOut() {
        return auth.signOut();
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(
            user => {
                setCurrentUser(user);
                setLoading(false);
            });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        signUp,
        reqError,
        loading,
        logIn,
        logOut,
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
