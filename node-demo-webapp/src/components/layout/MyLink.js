import React from 'react'
import { NavLink } from 'react-router-dom'
import { withRouter } from "react-router"
import style from './../../pantrycook-features'
const link = style.link

class MyLink extends React.Component {
    render () {
      if(this.props.history.location.pathname === this.props.to){
          if(this.props.history.location.search == '')
            return <NavLink className="nav-link" style={link.disable} to={this.props.to}>{this.props.linktext}</NavLink>
      }
      return <NavLink className="nav-link" to={this.props.to}>{this.props.linktext}</NavLink>
    }
  }

export default withRouter(MyLink)