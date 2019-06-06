import React from 'react'
import Style from './../../pantrycook-features'

const position = Style.position
const image = Style.image

class UserDetails extends React.Component {
    constructor(props){
        super(props)

    }
    render() {
        
        const userInfo = this.props.userInfo
        if(userInfo){
          return(
        <div style={position.centered}>
        <div className="card mb-3">
        <div className="row no-gutters">
            <div className="col-md-4">
            <img style = {image.size_2} src="/images/user_default.svg" className="card-img" alt="..."/>
            </div>
            <div className="col-md-8">
            <div className="card-body">
                <h5 className="card-title"> {userInfo.name}  </h5>
                <p class="font-weight-bold">{userInfo.login}</p>
                
                <p className="card-text">Aqui estará a descrição que o utilizador quiser inserir, falta depois mudar na base de dados para ter esse campo.</p>
                <p className="card-text"><small className="text-muted">Data criação do perfil talvez, ou outra informação.</small></p>
            </div>
            </div>
        </div>
        </div>
        </div>  
          )}
        else return <div></div>  
    }
}

export default UserDetails