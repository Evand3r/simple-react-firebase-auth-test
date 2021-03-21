import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [reqError, setReqError] = useState();

    function signUp(email, password) {
        setReqError('');
        return auth.createUserWithEmailAndPassword(email, password).catch(err => setReqError(err));
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => setCurrentUser(user));

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        signUp,
        reqError,
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
