import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../Firebase/firebase.config';
import axios from 'axios';

export const AuthContext = createContext(null);



const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});
    const [loading, setLoading] = useState(true);

    const googleProvider = new GoogleAuthProvider();
    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    // Register
    const registerUser = (name, email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, name, email, password)
    }

    // Sign In
    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            setLoading(false)
        });

        return () => {
            unSubscribe()
        }
    }, [])

    // useEffect(() => {
    //     const unSubscribe = onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             const loggeduser = { email: user.email };
    //             const userEmail = user?.email || currentUser?.email;
    //             console.log('habib3 343',userEmail);
    //             setCurrentUser(user);
    //             setLoading(false);

    //             axios.post('https://b8a11-server-side-habib162.vercel.app/jwt',loggeduser, {withCredentials: true})
    //             .then((res) => {
    //                 console.log('token response', res.data);
    //             });
    //         }
    //         // else{
    //         //     setCurrentUser(null); // set user to null if there is no authenticated user
    //         //     setLoading(false);
    //         //     axios.post('https://b8a11-server-side-habib162.vercel.app/logout', loggeduser, {
    //         //         withCredentials: true,
    //         //     }).then((res) => {
    //         //         console.log(res.data);
    //         //     });
    //         // }
            
    //     });

    // Logout

    const logout = () =>{
        setLoading(true)
        return signOut(auth)
    }

    const AuthInfo = {
        googleLogin,
        registerUser,
        signIn,
        logout,
        currentUser,
        loading
    }
    return (
        <AuthContext.Provider value={AuthInfo}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;