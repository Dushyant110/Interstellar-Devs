import React, { useRef, useState } from 'react';
import { updatePassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

export default function ProfilePage() {
    const passwordRef = useRef();
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    const handleChangePassword = async (e) => {
        e.preventDefault();
        const user = auth.currentUser;
        try {
            await updatePassword(user, passwordRef.current.value);
            setMessage('Password updated successfully!');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h2>Update Password</h2>
            <form onSubmit={handleChangePassword}>
                <input ref={passwordRef} type="password" placeholder="New Password" required />
                <button type="submit">Change Password</button>
            </form>
            {error && <p>{error}</p>}
            {message && <p>{message}</p>}
        </div>
    );
}
