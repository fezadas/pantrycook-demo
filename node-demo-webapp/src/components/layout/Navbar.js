import React from 'react'
import { connect } from 'react-redux'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'

const Navbar = (props) => {
  const {auth,username} = props
  const links = auth ? <SignedInLinks username={username} /> : <SignedOutLinks />
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <a className="navbar-brand" href="/">
          <img src="images/cooker.png" alt=""></img> 
          <span> </span>Pantry Cook
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          { links }
        </div>
      </div>
    </nav>
  )
}

// ?? subscriber ??
const mapStateToProps = (state) => {
  return {
    auth: localStorage.getItem('access_token'),
    username: localStorage.getItem('username')
  }
}

export default connect(mapStateToProps)(Navbar)