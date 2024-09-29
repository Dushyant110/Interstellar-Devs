import { updatePassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { useRef } from 'react';

export default function Profile() {
  const passwordRef = useRef();

  const handleChangePassword = async () => {
    const user = auth.currentUser;
    try {
      await updatePassword(user, passwordRef.current.value);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input ref={passwordRef} type="password" placeholder="New Password" />
      <button onClick={handleChangePassword}>Change Password</button>
    </div>
  );
}
