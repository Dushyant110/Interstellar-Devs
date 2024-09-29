import { useState } from 'react';
import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

export default function TwoFactorAuth() {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [verificationId, setVerificationId] = useState(null);

  const setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
  };

  const sendVerificationCode = async () => {
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    const confirmationResult = await signInWithPhoneNumber(auth, phone, appVerifier);
    setVerificationId(confirmationResult.verificationId);
  };

  const verifyCode = async () => {
    const credential = PhoneAuthProvider.credential(verificationId, code);
    await signInWithCredential(auth, credential);
  };

  return (
    <div>
      <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter phone number" />
      <button onClick={sendVerificationCode}>Send Code</button>
      <input type="text" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter verification code" />
      <button onClick={verifyCode}>Verify</button>
      <div id="recaptcha-container"></div>
    </div>
  );
}
