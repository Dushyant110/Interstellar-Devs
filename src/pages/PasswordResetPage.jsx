import React, { useRef, useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

export default function PasswordResetPage() {
    const emailRef = useRef();
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        try {
            await sendPasswordResetEmail(auth, emailRef.current.value);
            setMessage('Check your email for further instructions.');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h2>Reset Password</h2>
            <form onSubmit={handlePasswordReset}>
                <input ref={emailRef} type="email" placeholder="Enter your email" required />
                <button type="submit">Send Password Reset Email</button>
            </form>
            {error && <p>{error}</p>}
            {message && <p>{message}</p>}
        </div>
    );
}
