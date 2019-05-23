import React from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { signOut,refreshToken } from '../../store/actions/authActions'
import Style from '../../pantrycook-features'

const position = Style.position

class AlertRedirect extends React.Component {

    onClick(e){
        e.preventDefault()
        /*this.props.signOut()
        this.props.navigateSignIn()*/
        this.props.refresh()
    }

    render() {

        console.log(this.props.tokens)

        return(
            <div style = {position.centered}>
            <div  className="alert alert-warning" role="alert">
            <h4 className="alert-heading">Session Expired!</h4>
            <p>Aww, unfortunately your session expired. Please sign in again after you click the button.</p>
            <hr/>
            <button type="button" onClick={this.onClick.bind(this)} class="btn btn-warning">Re-Sign In</button>
            </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        navigateSignIn: () => dispatch(push('/signin')),
        signOut: () => dispatch(signOut()),
        refresh: () => dispatch(refreshToken(localStorage.getItem('refresh_token')))
    }
}

const mapStateToProps = (state) => {
    return {
       tokens: state.auth.tokens
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(AlertRedirect)