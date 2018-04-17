import React from 'react'

import './Login.css'
import { auth, googleProvider, githubAuthProvider } from './base'

const Login = () => {
  const authenticate = (provider) => {
    auth.signInWithPopup(provider)
  }

  return (
    <div className="Login">
      <main>        
        <button
          className="google"
          onClick={() => authenticate(googleProvider)}
        >
        Sign in with Google
        </button>
        <button
          className="facebook"
          onClick={() => authenticate(githubAuthProvider)}
        >
        Sign in with Github
        </button>
      </main>
    </div>
  )
}
export default Login