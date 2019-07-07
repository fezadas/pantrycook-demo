import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { replace } from 'connected-react-router'
import { signIn } from '../../store/actions/authActions'
import Style from '../../pantrycook-features'
import { isAuthenticated } from './../../storageUtils'

const position = Style.position

class SignIn extends Component {

    componentWillMount() {
        if(isAuthenticated())
            replace('/')
    }

    handleChange(e){
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.signIn(this.state)
    }

    render() {
        
        const { loading, authError } = this.props
        if(isAuthenticated())
            return <Redirect to='/' />
        console.log(this.props)
        return (
            <div style={position.centered}>
                <form className="form-signin" 
                    onSubmit={this.handleSubmit.bind(this)}>
                <img className="mb-4" src="images/cooker.svg" alt="Logo" width="72" height="72"/>
                <h1 className="h3 mb-3 font-weight-normal">
                    Please sign in
                </h1>
                <br/>
                <label htmlFor="username" className="sr-only">
                   Username
                </label>
                <input type="text" id="username" 
                    onChange={this.handleChange.bind(this)} className="form-control" placeholder="Username" required="required" autoFocus=""/>
                <br/>
                <label htmlFor="inputPassword" className="sr-only">
                    Password</label>
                <input type="password" id="password" onChange={this.handleChange.bind(this)} className="form-control" placeholder="Password" required="required"/> 
                <br/>
                <button className="btn btn-lg btn-primary btn-block" type="submit">
                    Log In
                </button>
                <div>
                    { loading ? 
                        <div style = {position.top_padding} className="text-center">
                            <div className="spinner-border text-primary" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div> 
                        : null 
                    }
                </div>
                <div>
                    { authError != null ? <p style = {position.top_padding}>Invalid credentials.</p> : null }
                </div>
                </form>
            </div> 
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.error,
        username: state.auth.username,
        loading: state.auth.loading,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (credentials) => dispatch(signIn(credentials))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)