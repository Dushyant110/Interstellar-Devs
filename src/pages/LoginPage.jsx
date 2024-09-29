import React from 'react';
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom'; // If you're using react-router-dom

export default function LoginPage() {
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState(null);

    const loginWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            setError(err.message);
        }
    };

    const loginWithGitHub = async () => {
        try {
            await signInWithPopup(auth, githubProvider);
        } catch (err) {
            setError(err.message);
        }
    };

    const loginWithEmail = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <button onClick={loginWithGoogle}>Login with Google</button>
            <button onClick={loginWithGitHub}>Login with GitHub</button>
            <form onSubmit={loginWithEmail}>
                <input ref={emailRef} type="email" placeholder="Email" required />
                <input ref={passwordRef} type="password" placeholder="Password" required />
                <button type="submit">Login with Email</button>
            </form>
            {error && <p>{error}</p>}
            <p>
                Don't have an account? <Link to="/sign-up">Sign Up</Link>
            </p>
            <p>
                Forgot your password? <Link to="/password-reset">Reset Password</Link>
            </p>
        </div>
    );
}
