import React from 'react'
import { connect } from 'react-redux'
import { push, replace } from 'connected-react-router'
import { fetchShoppingList, updateShoppingList } from '../../store/actions/shoppingListActions'
import ErrorAlert from '../layout/ErrorAlert'
import AutoSuggest from './../AutoSuggest'
import PantryCookApi from './../../data/pantryCookApi'
import Style from '../../pantrycook-features'

const UNAUTHORIZED = 401

const position = Style.position
const shopping = Style.shoppingList

class ShoppingListEdit extends React.Component {
    state = {
        id: null,
        shoppingList: [],
        cannotSaveChanges: false
    }
    constructor(props) {
        super(props)
        this.state.id = this.props.match.params.sl_id
    }

    componentDidMount() {
        if(!this.props.auth)
            return this.props.redirectLogin()
        this.props.getShoppingList(
            this.state.id, 
            (shoppingList) => { this.setState({ shoppingList }) })
    }

    handleOnQuantityChange(itemIdx, e) {
        let shoppingList = this.state.shoppingList
        const quantity = e.target.value
        shoppingList.items[itemIdx].quantity = quantity
        const cannotSaveChanges = isNaN(quantity) || quantity <= 0 
            ? true : false
        this.setState({ shoppingList, cannotSaveChanges })
    }

    handleItemRemoval(itemIdx) {
        let shoppingList = this.state.shoppingList
        shoppingList.items.splice(itemIdx, 1)
        this.setState({ shoppingList })
    }

    handleNewIngredientSelection(suggestion) {
        let shoppingList = this.state.shoppingList
        if(!shoppingList.items.find(i => i.IdIngredient == suggestion.IdIngredient)) {
            suggestion.IdIngredient = suggestion.id
            shoppingList.items.push(suggestion)
            this.setState({ shoppingList, cannotSaveChanges: true })
        }
    }

    renderIngredientSuggestion(suggestion) {
        return (
            <div>
                <p>{suggestion.name}</p>
            </div>
        )
    }

    fetchIngredientsBySuggestion(suggestion) {
        return PantryCookApi.ingredients.getList(suggestion)
            .then(res => {
                return res.ingredients
            })
    }

    saveChanges() {
        this.props.updateShoppingList(
            this.state.shoppingList,
            () => { this.props.navigateToShoppingList(this.state.id) })
    }

    render() {
        const { loading, error } = this.props
        const shoppingList = this.state.shoppingList
        
        if(error)
            if(error.statusCode == UNAUTHORIZED){
               return (
                <p style={position.top}>{error.body.Message}</p> //tem de fazer login de novo
                ) 
            }
            else return (
                <div style={position.centered_style}>
                    <ErrorAlert />
                </div>
            )
            
        if(loading)
            return <div>Loading...</div>;
        
        return (
            <div>
            <section style={shopping.section_pricing} class="pricing py-5">
            <div className="container" >
            <div className="row" style={position.centered_style}>
                {shoppingList && 
                    <div className="col-lg-4">
                    <div style={shopping.pricing_card} className="card mb-5 mb-lg-0">
                    <div className="card-body">
                        <h6 style = {shopping.pricing_card_price} class="card-price text-center">
                            {shoppingList.name}
                        </h6>
                        <hr style={shopping.pricing_hr}></hr>
                        
                        <ul style={shopping.ul_center} className="fa-ul">
                        {shoppingList.items && shoppingList.items.map((item, idx) =>{
                            return(
                            <li style={shopping.pricing_ul_li}>
                                <span className="fa-li"></span>
                                <span className="font-weight-bold">
                                    {item.name} - 
                                </span> 
                                <input
                                    type="text"
                                    value={this.props.shoppingList.items[idx].quantity}
                                    onChange={this.handleOnQuantityChange.bind(this, idx)}
                                />
                                <span className='close' 
                                    onClick={this.handleItemRemoval.bind(this, idx)}>X</span>
                                <span className="font-italic">
                                    {item.unity.length > 2 ? '' : item.unity}
                                </span>
                            </li>
                            )
                        })}
                       </ul>

                       <h6>Insert a new item</h6>
                        <AutoSuggest
                            handleSelection={this.handleNewIngredientSelection.bind(this)}
                            renderSuggestion={this.renderIngredientSuggestion.bind(this)}
                            onSuggestionsFetchRequested ={this.fetchIngredientsBySuggestion}
                        />
                        <div/>
                        <button 
                            onClick={this.saveChanges.bind(this)}
                            disabled={this.state.loading || this.state.cannotSaveChanges}>
                            Save Changes
                        </button>
                        {this.state.cannotSaveChanges &&
                            <p>All item's quantities must be a number superior to 0.</p>
                        }
                    </div>
                    </div>

                    

                </div>
                }
            </div>
            </div>
            </section>
            <div className="dropdown-divider"></div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        shoppingList: state.shoppingList.shoppingList,
        error: state.shoppingList.error,
        loading : state.shoppingList.loading,
        auth: localStorage.getItem('access_token')
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getShoppingList: (id, afterSuccess) => dispatch(fetchShoppingList(id, afterSuccess)),
        updateShoppingList: (shoppingList, afterSuccess) => dispatch(updateShoppingList(shoppingList, afterSuccess)),
        redirectLogin: () => dispatch(push(`/signin`)),
        navigateToShoppingList: (id) => dispatch(push(`/shoppinglists/${id}`))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ShoppingListEdit)