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
        // Handle code verification
    };

    return (
        <div>
            <h2>Two-Factor Authentication</h2>
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" />
            <button onClick={sendVerificationCode}>Send Code</button>
            <input type="text" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Verification Code" />
            <button onClick={verifyCode}>Verify Code</button>
            <div id="recaptcha-container"></div>
        </div>
    );
}
