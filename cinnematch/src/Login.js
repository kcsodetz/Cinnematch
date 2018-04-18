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
    <div className="Center">
      <main>        
        <button
          className="google"
          onClick={() => authenticate(googleProvider)}
        >
        <img src={googlebutton} style={{height:50}} alt="logo" />
        </button>
        <button
          className="facebook"
          onClick={() => authenticate(githubAuthProvider)}
        >
        <img src={githubbutton} style={{height:50}} alt="logo" />
        </button>
      </main>
    </div>
  )
}
export default Login