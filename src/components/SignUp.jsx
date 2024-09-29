import React, { useRef } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

export default function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSignUp}>
      <input ref={emailRef} type="email" placeholder="Email" />
      <input ref={passwordRef} type="password" placeholder="Password" />
      <button type="submit">Sign Up</button>
    </form>
  );
}
