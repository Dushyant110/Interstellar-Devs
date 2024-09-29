import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { useRef } from 'react';

export default function PasswordReset() {
  const emailRef = useRef();

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, emailRef.current.value);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handlePasswordReset}>
      <input ref={emailRef} type="email" placeholder="Enter your email" />
      <button type="submit">Send Password Reset Email</button>
    </form>
  );
}
