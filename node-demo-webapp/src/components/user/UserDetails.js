import React from 'react'
import Style from './../../pantrycook-features'
import ChangePassword from './ChangePassword'

const position = Style.position
const image = Style.image
const form = Style.form

class UserDetails extends React.Component {
    constructor(props){
        super(props)

    }
    render() {        
        const userInfo = this.props.userInfo
        if(userInfo){
          return(
        <div>
        <div style={position.centered}>
        <div className="card mb-3 bg-light">
        <div className="row no-gutters">
            <div className="col-md-4">
            <img style = {image.size_2} src="/images/user_default.svg" className="card-img" alt="..."/>
            </div>
            <div className="col-md-8">
            <div className="card-body">
                <h5 className="card-title"> {userInfo.name}  </h5>
                <p className="font-weight-bold">{userInfo.login}</p>
            </div>
            </div>
        </div>
        <ChangePassword/>
        </div >
        </div>  
        </div>
          )}
        else return <div></div>  
    }
}

export default UserDetails