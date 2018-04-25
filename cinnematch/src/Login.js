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
    <div>
    <header className="w3-container w3-goldenrod">
          <h1 className="Center">Login</h1>
        </header>
      <main className="Center">        
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
      <p className="Center">Please login to view site content!</p>
    </div>
  )
}
export default Login