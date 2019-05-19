import React from 'react'
import { connect } from 'react-redux'
import { fetchPantry } from '../../store/actions/pantryActions'
import Pantry from './../pantry/Pantry'
import { push } from 'connected-react-router'
import ErrorAlert from './../../components/layout/ErrorAlert'
import AlertRedirect from '../auth/AlertRedirect'
import Style from '../../pantrycook-features'

const UNAUTHORIZED = 401

const position = Style.position
const form = Style.form

/**
 * Represents the Parent Component of Pantry, including the SearchBar
 */

class PantrySearchBar extends React.Component {
    state = {
        suggestion: null
    }

    componentDidMount(){
        if(!this.props.auth){
            this.props.redirectLogin()
        }else {
            let suggestion
            let missing
            if(this.props.location.query){
                missing = this.props.location.query.missing
                suggestion = this.props.location.query.suggestion
            }
            this.props.searchIngredients(suggestion,missing)
        }
    }

    handleChange(e){
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleClick(e){
        e.preventDefault();
        this.setState(this.props.searchIngredients(this.state.suggestion))
    }

    refreshClick(e){
        e.preventDefault();
        this.setState(this.props.searchIngredients())
    }

    navigateClick(e){
        e.preventDefault();
        this.props.navigateToPantryEdit()
    }

    render(){
        const { loading, res, error } = this.props
        if(error)
            if(error.statusCode == UNAUTHORIZED){
                return (
                    <AlertRedirect/>
                )
            }
            else return (
                <div style={position.centered_1}>
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
        const ingredients = res.ingredients 
        return(
            <div>
                <div className="dropdown-divider"></div>
                <div className="container" style={position.top}>
                <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <button className="btn btn-outline-secondary" onClick={this.handleClick.bind(this)} type="button">Search</button>
                </div>
                <input type="text" id="suggestion" onChange={this.handleChange.bind(this)} className="form-control" placeholder=" write your ingredient name here" aria-label="" aria-describedby="basic-addon1"/>
                </div>
                <button style={form.button_space} className="btn btn-success" type="button" onClick={this.refreshClick.bind(this)}>Refresh Pantry</button>
                <button className="btn btn-warning" type="button" onClick={this.navigateClick.bind(this)}>Edit Pantry</button>
                <Pantry ingredients={ingredients} ></Pantry>
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        res: state.pantry.pantry,
        error: state.pantry.error,
        loading : state.pantry.loading,
        auth: localStorage.getItem('access_token')
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        searchIngredients: (suggestion,missing) => dispatch(fetchPantry(suggestion,missing)),
        navigateToPantryEdit: () => dispatch(push(`/pantry/edit`)),
        redirectLogin: () => dispatch(push(`/signin`))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PantrySearchBar)