import React from 'react'
import { isAuthenticated,getItem } from './../../storageUtils'
import { fetchUserInfo } from '../../store/actions/userActions'
import { replace } from 'connected-react-router'
import { connect } from 'react-redux'
import UserDetails from './UserDetails'
import Style from './../../pantrycook-features'
import ErrorAlert from './../../components/layout/ErrorAlert'

const position = Style.position

class UserInfo extends React.Component {

    componentDidMount(){
        const login = getItem("username")
        this.props.getUserInfo(login)
    }

    render() {
        const {loading,res,error} = this.props
        console.log(this.props)
        if(error){
            return (
                <div style={position.centered_1}>
                    <ErrorAlert />
                </div>  
            )
            }
        if(loading){
            return (
                <div style = {position.centered} className="text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                </div>
            )}   
        return ( 
            <div>
                <UserDetails userInfo={res}></UserDetails>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        res: state.user.userInfo,
        error: state.user.error,
        loading : state.user.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUserInfo: () => dispatch(fetchUserInfo()),
        redirectLogin: () => dispatch(replace('/signin')),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserInfo)