import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'
import { AuthContext } from '../context/AuthContext'
function NavBar() {
    const {user, logout} = useContext(AuthContext)
  return (
    <nav className='navbar'>
        <div className='navbar-barnd'>
            <Link to={'/'}>ShopHub</Link>
        </div>
        
        <div className='navbar-links'>
            <Link className='navbar-link' to={'/'}>Home</Link>
            <Link className='navbar-link' to={'/Checkout'}>Cart</Link>
        </div>

        <div className='navbar-auth-links'>
            <Link to={'/AuthPage'}>{user === null ? <button className='btn'>Sign Up</button> : <p className='navbar-greeting'>{user.email}</p>}</Link>
        </div>
    </nav>
  )
}

export default NavBar