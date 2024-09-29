import React from 'react';
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

export default function Login() {
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error);
    }
  };

  const loginWithGitHub = async () => {
    try {
      await signInWithPopup(auth, githubProvider);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={loginWithGoogle}>Login with Google</button>
      <button onClick={loginWithGitHub}>Login with GitHub</button>
    </div>
  );
}
