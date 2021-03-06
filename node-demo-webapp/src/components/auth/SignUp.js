import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { signUp } from './../../store/actions/authActions'
import Style from '../../pantrycook-features'
import { isAuthenticated } from './../../storageUtils'
import { replace } from 'connected-react-router'

const position = Style.position

class SignUp extends Component {
    
    componentWillMount() {
        if(isAuthenticated())
            replace('/')
    }

    handleChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.signUp(this.state)
    }

    render() {
        const { loading, authError } = this.props
        if(isAuthenticated())
            return <Redirect to='/' />

        return (
            <div style={position.centered}>
                <form className="form-signin" 
                    onSubmit={this.handleSubmit.bind(this)}>
                <img className="mb-4" src="images/cooker.svg" alt="Logo" width="72" height="72"/>
                <h1 className="h3 mb-3 font-weight-normal">
                    Please sign up</h1>
                <br/>
                <label htmlFor="username" className="sr-only">
                    User Name</label>
                <input type="text" id="username" 
                    onChange={this.handleChange.bind(this)} className="form-control" placeholder="Username" required="required" autoFocus=""/>
                 <br/>
                <label htmlFor="name" className="sr-only">
                    Name</label>
                <input type="text" id="name" 
                    onChange={this.handleChange.bind(this)} className="form-control" placeholder="Name" required="required" autoFocus=""/>
                 <br/>
                <label htmlFor="inputPassword" className="sr-only">
                    Password</label>
                <input type="password" id="password" 
                    onChange={this.handleChange.bind(this)} className="form-control" placeholder="Password" required="required"/> 
                 <br/>
                <button className="btn btn-lg btn-primary btn-block" type="submit">
                    Register
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
                    { authError ? <p>Invalid credentials.</p> : null }
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
        loading:state.auth.loading,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (credentials) => dispatch(signUp(credentials))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)