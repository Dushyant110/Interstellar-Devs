import React, { useRef, useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { Link } from 'react-router-dom';

export default function SignUpPage() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState(null);

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h2>Create an Account</h2>
            <form onSubmit={handleSignUp}>
                <input ref={emailRef} type="email" placeholder="Email" required />
                <input ref={passwordRef} type="password" placeholder="Password" required />
                <button type="submit">Sign Up</button>
            </form>
            {error && <p>{error}</p>}
            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
}
