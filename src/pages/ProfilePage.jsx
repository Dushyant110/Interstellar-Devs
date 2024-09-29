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
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Update Password</h2>

                <form onSubmit={handleChangePassword} className="space-y-4">
                    <div>
                        <input
                            ref={passwordRef}
                            type="password"
                            placeholder="New Password"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
                    >
                        Change Password
                    </button>
                </form>

                {error && <p className="text-red-500 text-center mt-4">{error}</p>}
                {message && <p className="text-green-500 text-center mt-4">{message}</p>}
            </div>
        </div>
    );
}
