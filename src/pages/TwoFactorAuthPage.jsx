import React, { useState } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

export default function TwoFactorAuthPage() {
    const [phone, setPhone] = useState('');
    const [code, setCode] = useState('');
    const [verificationId, setVerificationId] = useState(null);

    const setupRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
    };

    const sendVerificationCode = async () => {
        setupRecaptcha();
        const appVerifier = window.recaptchaVerifier;
        try {
            const confirmationResult = await signInWithPhoneNumber(auth, phone, appVerifier);
            setVerificationId(confirmationResult.verificationId);
        } catch (error) {
            console.error(error.message);
        }
    };

    const verifyCode = async () => {
        // Handle code verification logic here
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Two-Factor Authentication</h2>

                <div className="space-y-4">
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone Number"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                    <button
                        onClick={sendVerificationCode}
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
                    >
                        Send Code
                    </button>

                    {verificationId && (
                        <>
                            <input
                                type="text"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                placeholder="Verification Code"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            />
                            <button
                                onClick={verifyCode}
                                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300"
                            >
                                Verify Code
                            </button>
                        </>
                    )}

                    <div id="recaptcha-container" className="mt-4"></div>
                </div>
            </div>
        </div>
    );
}
