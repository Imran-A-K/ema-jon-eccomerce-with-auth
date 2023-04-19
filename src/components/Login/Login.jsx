import React, { useContext, useState } from 'react'
import './Login.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../Providers/AuthProvider'

const Login = () => {

  const [showPassword,setShowPassword] = useState(false)

  const {signIn} = useContext(AuthContext);  
  // const [error, setError] = useState('');
  const location = useLocation();
  console.log(location)
  const from =location.state?.from?.pathname || '/';
  const navigate = useNavigate();

  const handleLogin = event => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    
    signIn(email,password)
    .then(result => {
      const loggedUser = result.user;
      console.log(loggedUser);
      form.reset();
      navigate(from, {replace:true})
    })
    .catch(error => {
      console.error(error.message);
      // setError(error.message);
    })
  }
  return (
    <div className='form-container'>
        <h2 className='form-title'>Please Login</h2>
        <form onSubmit={handleLogin}>
            <div className='form-control'>
                <label htmlFor="email">Email</label>
                <input type="email" name='email' required />
            </div>
            <div className='form-control'>
                <label htmlFor="password">Password</label>
                <input type={showPassword ? "text" : "password"} name='password' required />
                <p onClick={() => setShowPassword(!showPassword)}><small>
                  {
                    showPassword ? <span>Hide Password</span> : <span>Show Password</span>
                  }
                  </small></p>
            </div>
            <input className='btn-submit' type="submit" value="Login" />
        </form>
        <p><small>New to the site? <Link to='/signup'>Create New Account</Link></small></p>
    </div>
  )
}

export default Login