import React from "react"
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { changePassword } from '../../store/actions/userActions'
import Style from '../../pantrycook-features'

const position = Style.position
const form = Style.form

class ChangePassword extends React.Component {
    constructor() {
        super();
        this.state = {
          currentpassword: '',
          newpassword: '',
          confirmnewpassword: '',
          authError:null
        };
      }
    
      handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.newpassword != this.state.confirmnewpassword){
            alert("New Password and Confirm Password must be equal. Try again!")
            this.setState({
                currentpassword: '',
                newpassword: '',
                confirmnewpassword: ''
            })
        }
        else
        this.props.changePassword({
            newpassword:this.state.newpassword,
            currentpassword:this.state.currentpassword
        })
      }

      handleCurrentpasswordChange = (event) => {
        this.setState({ currentpassword: event.target.value });
      };

      handleNewpasswordChange = (event) => {
        this.setState({ newpassword: event.target.value });
      };

      handleConfirmnewpasswordChange = (event) => {
        this.setState({ confirmnewpassword: event.target.value });
      };
    
      render() {
        const { loading, authError,username} = this.props
        console.log(authError)
        return (
          <div>
            <form className="form-signin" 
                    onSubmit={this.handleSubmit.bind(this)}>
                <h1 className="h3 mb-3 font-weight-normal">
                    <span class="badge badge-dark">Change your password</span>
                </h1>
                <label htmlFor="username" className="sr-only">
                    Current Password
                </label>
                <input style={form.size_100} type="password" id="currentpassword" value = {this.state.currentpassword}
                    onChange={this.handleCurrentpasswordChange.bind(this)} className="form-control" placeholder="Current Password" required="required"/>
                <label htmlFor="inputPassword" className="sr-only">
                    New Password</label>
                    <p></p>
                <input style={form.size_100} type="password" id="newpassword" value = {this.state.newpassword}
                    onChange={this.handleNewpasswordChange.bind(this)} className="form-control" placeholder="New Password" required="required"/> 
                <label htmlFor="inputPassword" className="sr-only">
                    Confirm Password</label>
                    <p></p>    
                <input style={form.size_100} type="password" id="confirmnewpassword" value = {this.state.confirmnewpassword}
                    onChange={this.handleConfirmnewpasswordChange.bind(this)} className="form-control" placeholder="Confirm Password" required="required"/> 
                <p></p>
                <button style={form.size_100} className="btn btn-lg btn-dark btn-block" type="submit">
                   Confirm
                </button>

                <p></p>
                
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
                { authError ? <p style = {position.top_padding}>Invalid credentials.</p> : null }
                </div>
                </form>
          </div>
        );
      }
}

const mapStateToProps = (state) => {
    return {
        authError: state.user.authError,
        username: state.user.username,
        loading: state.user.loading,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changePassword: (credentials) => dispatch(changePassword(credentials))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)

