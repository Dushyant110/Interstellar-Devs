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
    const navigate = useNavigate(); // Hook to programmatically navigate

    const loginWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            navigate("/two-factor-auth");
        } catch (err) {
            setError(err.message);
        }
    };

    const loginWithGitHub = async () => {
        try {
            await signInWithPopup(auth, githubProvider);
            navigate("/two-factor-auth");
        } catch (err) {
            setError(err.message);
        }
    };

    const loginWithEmail = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value);
            navigate("/two-factor-auth");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-800 to-gray-900 relative overflow-hidden">
            <nav className="absolute top-0 left-0 right-0 flex justify-between items-center p-4 bg-transparent z-10">
                <Link to="/" className="flex items-center">
                    <img
                        src="your-logo-url.png" // Replace with your logo URL
                        alt="Logo"
                        className="h-10" // Adjust logo height as needed
                    />
                </Link>
                <Link to="/" className="text-white bg-indigo-600 rounded px-6 py-3 transition-all duration-300 ease-in-out hover:bg-indigo-700 hover:shadow-lg hover:rounded-2xl">
                    Home
                </Link>
            </nav>

            <div className="absolute inset-0 flex flex-wrap justify-center pointer-events-none z-0">
                {Array.from({ length: 50 }).map((_, index) => (
                    <div key={index} className={`dot dot-${index}`} />
                ))}
            </div>

            <div className="flex max-w-4xl w-full shadow-lg rounded-lg overflow-hidden z-10">
                <div className="hidden md:block w-1/2 bg-white">
                    <img
                        src="https://img.freepik.com/free-vector/flat-illustration-stock-trader-working-computer-with-graphs-man-investor-using-pc-analyzing-charts-diagrams-exchange-market-finances-cryptocurrency-investing_74855-20567.jpg?w=2000&t=st=1727629695~exp=1727630295~hmac=fe21d2c10f06284d06b0d5834b2a33b71528affef5583557f6e98507c4733751"
                        alt="login"
                        className="w-auto h-100 object-cover mt-[97px]"
                    />
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
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="27" height="27" viewBox="0 0 48 48" className="mr-1">
                                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                            </svg>
                            Continue with Google
                        </button>

                        <button
                            onClick={loginWithGitHub}
                            className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-100 hover:shadow-lg hover:rounded-2xl"
                        >
                            <svg className="h-5 w-5 mr-2" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.54 5.47 7.59.4.073.55-.173.55-.385 0-.191-.007-.697-.011-1.37-2.24.488-2.71-1.08-2.71-1.08-.365-.92-.89-1.165-.89-1.165-.727-.496.055-.486.055-.486.805.056 1.226.825 1.226.825.715 1.225 1.875.87 2.328.664.072-.517.28-.87.507-1.069-1.77-.201-3.63-.886-3.63-3.951 0-.872.313-1.585.825-2.145-.083-.201-.358-1.016.078-2.114 0 0 .67-.215 2.2.82A7.668 7.668 0 018 4.5c.68.003 1.36.092 2 .267 1.53-1.034 2.2-.82 2.2-.82.436 1.098.162 1.913.079 2.114.512.56.825 1.273.825 2.145 0 3.069-1.86 3.75-3.63 3.951.288.248.546.738.546 1.49 0 1.075-.01 1.943-.01 2.206 0 .215.149.462.558.384C13.71 14.54 16 11.54 16 8c0-4.42-3.58-8-8-8z"
                                />
                            </svg>
                            Continue with GitHub
                        </button>
                    </div>

                    {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
                </div>
            </div>
        </div>
    );
}
