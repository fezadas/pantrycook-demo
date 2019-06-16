import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'
import { push } from 'connected-react-router'

class SignedInLinks extends React.Component {
  
  onLogout = (e) => {
    e.preventDefault()
    this.props.signOut()
    this.props.redirect()
  }

  render(){
    const username = this.props.username
    return (
      <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/recipes">Recipes</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/pantry">Pantry</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/shoppingLists">ShoppingLists</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/contacts">Contact</NavLink>
          </li>
          {username && username == 'admin' && 
          <li className="nav-item">
            <NavLink className="nav-link" to="/tools">Tools</NavLink>
          </li>
          }
          <li className="nav-item">
            <a className="nav-link" onClick={this.onLogout.bind(this)}> SignOut</a>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to ="/user"> <span className="badge badge-success">{this.props.username}</span></NavLink>
          </li>
          </ul>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
    redirect: () => dispatch(push('/'))
  }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)