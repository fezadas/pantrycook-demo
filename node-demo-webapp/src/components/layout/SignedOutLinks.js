import React from 'react'
import { NavLink } from 'react-router-dom'

const SignedOutLinks = () => {
    return (
      <ul className="navbar-nav ml-auto">
          <li className="nav-item">
          <NavLink className="nav-link" to="/">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/contacts">Contact</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/signin">Sign In</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/signup">Sign Up</NavLink>
          </li>
        </ul>
    )
}

export default SignedOutLinks