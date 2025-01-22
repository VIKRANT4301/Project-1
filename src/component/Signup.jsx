/* eslint-disable no-unused-vars */

import React, { useState } from 'react'
import Axios from "axios"
import './signup.css'
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    // Use the environment variable to dynamically determine the API URL
    // eslint-disable-next-line no-undef
    const apiUrl = process.env.REACT_APP_API_URL||"https://media-provenance-e3ox.onrender.com";
    console.log('API URL:', apiUrl); 

    Axios.post(`${apiUrl}/auth/signup`, {
      username,
      email,
      password,
    }).then(response => {
      if (response.data.status) {
        navigate('/')
      }

    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h2>Media Integrity and Provenance</h2>
          <p>
            Media Integrity and Provenance refers to the process of ensuring the authenticity, origin, and history of digital media, such as images, videos, and documents, using technologies like blockchain. It aims to protect media from tampering and provide verifiable proof of its source and alterations.
          </p>
          <span>Do you have an account?</span>
          <Link to="/">
            <button>Login</button>
          </Link>
        </div>

        <div className='right'>
          <h2>Sign Up</h2>
          <form className='sign-up-form' onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input type="text" placeholder='Username'
              onChange={(e) => setUsername(e.target.value)}
            />

            <label htmlFor="email">Email:</label>
            <input type="email" autoComplete='off' placeholder='Email'
              onChange={(e) => setEmail(e.target.value)} />

            <label htmlFor="password">Password:</label>
            <input type="password" placeholder='*******'
              onChange={(e) => setPassword(e.target.value)} />

            <button type='submit'>Sign Up</button>
            <p>Already have an account? </p><Link to="/login">Login</Link>

          </form>
        </div>
      </div>
    </div>
  )
};

export default Signup;
