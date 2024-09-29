import React, { useState, useRef } from 'react';
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginPage() {
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const loginWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            navigate('/two-factor-auth'); 
        } catch (err) {
            setError(err.message);
        }
    };

    const loginWithGitHub = async () => {
        try {
            await signInWithPopup(auth, githubProvider);
            navigate('/two-factor-auth'); 
        } catch (err) {
            setError(err.message);
        }
    };

    const loginWithEmail = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value);
            navigate('/two-factor-auth'); 
        } catch (err) {
            setError("Either email/password invalid");
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
                        Continue with Google
                    </button>

                    <button
                        onClick={loginWithGitHub}
                        className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-100"
                    >
                        Continue with GitHub
                    </button>
                </div>


                <div className="bg-white w-full md:w-1/2 p-8">
                    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6 tracking-wider">Login</h2>

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
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300 hover:shadow-lg hover:rounded-2xl" 
                        >
                            Login with Email
                        </button>
                    </form>

                    <div className="flex items-center w-full mt-[30px]">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="px-4 text-gray-400">Or login with</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    <div className="space-y-4">
                        <button
                            onClick={loginWithGoogle}
                            className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-100 mt-[30px] hover:shadow-lg hover:rounded-2xl"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="27" height="27" viewBox="0 0 48 48" class="mr-1" >
                                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                            </svg>

                            Continue with Google
                        </button>

                        <button
                            onClick={loginWithGitHub}
                            className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-100 hover:shadow-lg hover:rounded-2xl"
                        >
                            <svg className="h-5 w-5 mr-2" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.54 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.58.82-2.14-.08-.2-.36-1.01.08-2.1 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.52-1.03 2.2-.82 2.2-.82.44 1.09.16 1.9.08 2.1.51.56.82 1.27.82 2.14 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.001 8.001 0 0 0 8 0z"
                                />
                            </svg>
                            Continue with GitHub
                        </button>
                    </div>

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
            <style jsx>{`
                .dot {
                    width: 5px; /* Size of the dots */
                    height: 5px; /* Size of the dots */
                    background-color: rgba(255, 255, 255, 0.7); /* Base color */
                    border-radius: 50%;
                    position: absolute;
                    animation: glow 1.5s infinite alternate; /* Glow animation */
                    pointer-events: none; /* Prevent interaction */
                    box-shadow: 0 0 5px rgba(255, 255, 255, 0.5), 0 0 10px rgba(255, 255, 255, 0.5), 0 0 15px rgba(255, 255, 255, 0.5); /* Neon glow */
                }

                /* Animation for glowing effect */
                @keyframes glow {
                    0% {
                        transform: scale(1);
                        opacity: 0.7; /* Start opacity */
                    }
                    100% {
                        transform: scale(1.5);
                        opacity: 1; /* End opacity */
                    }
                }

                /* Position each dot randomly */
                ${Array.from({ length: 50 }).map((_, index) => `
                    .dot-${index} {
                        left: ${Math.random() * 100}%; /* Random horizontal position */
                        top: ${Math.random() * 100}%; /* Random vertical position */
                        animation-delay: ${Math.random() * 2}s; /* Random animation delay */
                    }
                `).join('')}
            `}</style>
        </div>

    );
}
