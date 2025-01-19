
/* eslint-disable no-unused-vars */

import React,{useState} from 'react'
import Axios from "axios"
import "./fp.css"
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {

    const[email, setEmail] = useState("")


    const navigate = useNavigate()

    const handleSubmit = (e) =>{
      e.preventDefault();
      Axios.post("http://localhost:3000/auth/forgotpassword",{

      email,

    }).then(response =>{
      if(response.data.status){
        alert("Check your Email for reset password")
          navigate('/login')
      }

    }).catch(err =>{
      console.log(err)
    })
  }
    return(
         <div className='sign-up-container'>
            <h2>Forgot Password</h2>
            <form className='sign-up-form' onSubmit={handleSubmit}>

                <label htmlFor="email">Email:</label>
                <input type="email" autoComplete='off' placeholder='Email'
                onChange={(e) =>setEmail(e.target.value)}/>


                <button type='submit'>Send</button>
                <p>Already have an account? </p><Link to="/login">Login</Link>

            </form>
         </div>

    )
};

export default ForgotPassword