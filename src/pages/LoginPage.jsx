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
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h2>

                <div className="space-y-4">
                    <button
                        onClick={loginWithGoogle}
                        className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-100"
                    >
                        <svg className="h-5 w-5 mr-2" viewBox="0 0 48 48">
                            <path
                                fill="#EA4335"
                                d="M24 9.5c3.4 0 6.2 1.1 8.5 3.1l6.3-6.3C34.8 2.6 29.8 0 24 0 14.7 0 7.2 5.7 4.3 13.9l7.3 5.7C13.3 13.1 18.2 9.5 24 9.5z"
                            />
                            <path
                                fill="#34A853"
                                d="M46.5 24.5c0-1.5-.1-2.9-.4-4.3H24v8.1h12.6c-.5 2.6-2 4.8-4.2 6.3v5h6.7c3.9-3.6 6.4-9 6.4-15.1z"
                            />
                            <path
                                fill="#4A90E2"
                                d="M13.3 28.1c-1.1-.3-2.2-.8-3.1-1.4l-7.3 5.7C6.6 38.3 14.7 44 24 44c5.5 0 10.5-1.9 14.2-5.2l-6.7-5c-2.3 1.6-5.2 2.5-8.3 2.5-5.8.1-10.7-3.6-12.9-8.7z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M24 44c3.1 0 6-.9 8.3-2.5l-6.7-5c-1.7.5-3.5.8-5.3.8-5.8 0-10.7-3.6-12.9-8.7l-7.3 5.7C6.6 38.3 14.7 44 24 44z"
                            />
                        </svg>
                        Continue with Google
                    </button>

                    <button
                        onClick={loginWithGitHub}
                        className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-100"
                    >
                        <svg className="h-5 w-5 mr-2" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.54 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.58.82-2.14-.08-.2-.36-1.01.08-2.1 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.52-1.03 2.2-.82 2.2-.82.44 1.09.16 1.9.08 2.1.51.56.82 1.27.82 2.14 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.001 8.001 0 0 0 8 0z"
                            />
                        </svg>
                        Continue with GitHub
                    </button>
                </div>

                <form onSubmit={loginWithEmail} className="space-y-4 mt-6">
                    <div>
                        <input
                            ref={emailRef}
                            type="email"
                            placeholder="Email"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>
                    <div>
                        <input
                            ref={passwordRef}
                            type="password"
                            placeholder="Password"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
                    >
                        Login with Email
                    </button>
                </form>

                {error && <p className="text-red-500 text-center mt-4">{error}</p>}

                <div className="text-center mt-4">
                    <p>
                        Don't have an account?{' '}
                        <Link to="/sign-up" className="text-indigo-600 hover:underline">
                            Sign Up
                        </Link>
                    </p>
                    <p>
                        Forgot your password?{' '}
                        <Link to="/password-reset" className="text-indigo-600 hover:underline">
                            Reset Password
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
