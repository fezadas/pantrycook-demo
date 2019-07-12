import React from 'react'
import MyLink from './MyLink'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'
import { push } from 'connected-react-router'
import Style from './../../pantrycook-features'

const link = Style.link

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
            <MyLink className="nav-link" to="/recipes" linktext="Recipes"/>
          </li>
          <li className="nav-item">
            <MyLink className="nav-link" to="/pantry" linktext="Pantry"/>
          </li>
          <li className="nav-item">
            <MyLink className="nav-link" to="/shoppingLists" linktext="ShoppingLists"/>
          </li>
          <li className="nav-item">
            <MyLink className="nav-link" to="/contacts" linktext="Contact"/>
          </li>
          {username && username == 'admin' && 
          <li className="nav-item">
            <MyLink className="nav-link" to="/tools" linktext="Tools"/>
          </li>
          }
          <li className="nav-item">
            <a style={link.pointer} className="nav-link" onClick={this.onLogout.bind(this)}> SignOut</a>
          </li>
          <li className="nav-item">
        <MyLink className="nav-link" to ="/user" linktext={<span className="badge badge-success">{this.props.username}</span>}/>
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