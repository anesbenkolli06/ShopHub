import React, { useContext, useState } from 'react'
import './Pages.css'
import { useForm } from 'react-hook-form';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


function AuthPage() {
  const {signUp, user, login, logout} = useContext(AuthContext)  
  const [mode, setMode] = useState("signup");
  const {register, handleSubmit, formState: {errors}} = useForm()
  const [result, setResult] = useState(null)
  const navigate = useNavigate();


    function onSubmit(data){
      let res;
      if(mode === "signup"){
        res = signUp(data.email, data.password);
      }else{
        res = login(data.email, data.password)
      }
      setResult(res)
      console.log(res)
  }
  return (
    <div className='authPage-container'>
      <div className='authPage-form'>
        {mode === "signup" ? <h1>Sign Up</h1> : <h1>Login</h1> }
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='form-group'>
            <label htmlFor="email">Email</label>
            <input {...register('email', {required: "email is required!"})} id='email' placeholder='Type your email...' type="email" />
          </div>
          {errors.email && <p style={{display: 'flex', alignSelf: 'flex-start', marginLeft: '82px', fontFamily: 'poppins', fontSize: '0.8rem', color: 'crimson'}}>{errors.email.message}</p>}


          <div className='form-group'>
            <label htmlFor="password">Password</label>
            <input {...register('password', {required: "Password is required!", minLength:{value: 8, message: "password should be at least 8 chars"}, maxLength: {value: 16, message: "password should be at most 16 chars"}})} id='password' placeholder='Type your password...' type="password" />
          </div>
          {errors.password && <p style={{display: 'flex', alignSelf: 'flex-start', marginLeft: '82px', fontFamily: 'poppins', fontSize: '0.8rem', color: 'crimson'}}>{errors.password.message}</p>}

          <div className="form-buttons">
            <button className='btn1' type='submit'>{mode === "signup" ? "Sign Up" : "Login"}</button>
            {user && <button onClick={logout} className='btn2'>Logout</button>}
          </div>
          
        </form>
        {result && (result.success === true ? navigate("/"): <p className='loggedin-error'>{result.error}.</p>)}
        <div className='auth-switch'>
          {mode === "signup" ? <p>Already have an account ? <span onClick={()=>{setMode("login")}}>Login</span></p> : <p>Dont have an Account ? <span onClick={()=>{setMode("signup")}}>SignUp</span></p> }
        </div>
      </div>
    </div>
  )
}

export default AuthPage