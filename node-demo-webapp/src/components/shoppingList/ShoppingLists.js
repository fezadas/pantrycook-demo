import React from 'react'
import { connect } from 'react-redux'
import { fetchShoppingLists, createShoppingList } from '../../store/actions/shoppingListActions'
import { refreshToken } from '../../store/actions/authActions'
import ShoppingListItem from '../shoppingList/ShoppingListItem'
import { push } from 'connected-react-router'
import ErrorAlert from './../../components/layout/ErrorAlert'
import Style from '../../pantrycook-features'

const position = Style.position
const UNAUTHORIZED = 401

class ShoppingLists extends React.Component {

    componentDidMount() {
        this.props.auth ? 
            this.props.getShoppingLists() 
            : this.props.redirectLogin()
    }

    handleChange = (e) => {
        const name = e.target.value;
        this.setState({name: name})
    }

    handleSubmit(e){
        e.preventDefault()
        const name = this.state.name
        const shoppingList = {Name:name,Items:[]}
        this.props.createShoppingList(shoppingList,(sl_id)=>{
            this.props.redirectShoppingListEdit(sl_id)
        })
    }
    
    render() {
        const {shoppingLists,error,loading} = this.props
        const name = this.state ? this.state.name : ''
        console.log(error)
        if(error)
            if(error.statusCode == UNAUTHORIZED){
              return (
                <p style={position.top}>{error.body.Message}</p> //tem de fazer login de novo
            )  
            } else return(
                <div style={position.centered}>
                    <ErrorAlert />
                </div>
            )
            

        if(loading){
            return(
            <div style = {position.centered} className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            </div>)
        }

        if(shoppingLists){
            return(
                <div className="container" style= {position.list_centered_style}>
                    <h1 className="jumbotron-heading">Shopping Lists</h1>
                    <p className="lead text-muted">These are your active shopping lists</p>
                    <div >
                        <form autoComplete="off" className="form-inline" onSubmit={this.handleSubmit.bind(this)}>
                            <div className="form-group mx-sm-3 mb-2">
                                <label className="sr-only">ShoppingList Name</label>
                                <input name="name" required="required" value={name} onChange={this.handleChange.bind(this)} className="form-control" type="text"  placeholder="Name"></input>
                            </div>
                            <button type="submit" className="btn btn-primary mb-2">Create List</button>
                        </form>
                    </div>
                    <div className="row">
                     {shoppingLists && shoppingLists.shoppingLists.map(elem => {
                    return <ShoppingListItem key={elem.id} shoppingListInfo = {elem}/>
                })}
                </div> 
                </div>
            )
        } else return null
    }

}

const mapStateToProps = (state) => {
    return {
        shoppingLists: state.shoppingList.shoppingLists,
        error: state.shoppingList.error,
        loading : state.shoppingList.loading,
        auth: localStorage.getItem('access_token'),
        name:''
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getShoppingLists: () => dispatch(fetchShoppingLists()),
        redirectLogin: () => dispatch(push(`/signin`)),
        getNewToken: (refresh_Token) => dispatch(refreshToken(refresh_Token)),
        createShoppingList: (shoppingList,redirect) => dispatch(createShoppingList(shoppingList,redirect)),
        redirectShoppingListEdit: (id) => dispatch(push(`/shoppingLists/${id}/edit`))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ShoppingLists)
