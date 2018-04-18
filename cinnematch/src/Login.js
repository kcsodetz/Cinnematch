import React from 'react'
import googlebutton from './login with google.png'
import githubbutton from './login with github.png'

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
        <img src={googlebutton} alt="logo" />
        </button>
        <button
          className="facebook"
          onClick={() => authenticate(githubAuthProvider)}
        >
        <img src={githubbutton} alt="logo" />
        </button>
      </main>
    </div>
  )
}
export default Login