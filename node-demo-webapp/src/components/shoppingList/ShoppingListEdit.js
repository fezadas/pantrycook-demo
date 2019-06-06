import React from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { fetchShoppingList, updateShoppingList } from '../../store/actions/shoppingListActions'
import ErrorAlert from '../layout/ErrorAlert'
import AutoSuggest from './../AutoSuggest'
import PantryCookApi from './../../data/pantryCookApi'
import Style from '../../pantrycook-features'
import { isAuthenticated } from './../../storageUtils'
import theme from '../../theme.css'

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
        const pantryCookApi = new PantryCookApi()
        this.state = { pantryCookApi } 
        this.state.id = this.props.match.params.sl_id
    }

    componentDidMount() {
        if(!isAuthenticated())
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
        return this.state.pantryCookApi.ingredients.getList(suggestion)
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
            return (
                <div style={position.centered_style}>
                    <ErrorAlert />
                </div>
            )
            
        if(loading)
            return <div>Loading...</div>;
        
        return (
            <div>
            <section style={shopping.section_pricing} className="pricing py-5">
            <div className="container" >
            <div className="row" style={position.centered_style}>
                {shoppingList && 
                    <div className="col-lg-4">
                    <div style={shopping.pricing_card} className="card mb-5 mb-lg-0">
                    <div className="card-body">
                        <h6 style = {shopping.pricing_card_price} className="card-price text-center">
                            {shoppingList.name}
                        </h6>
                        <hr style={shopping.pricing_hr}></hr>
                        
                        <ul style={shopping.ul_center} className="fa-ul">
                        
                        {shoppingList.items && shoppingList.items.map((item, idx) =>{
                            return(
                            <li key={item.name} style={shopping.pricing_ul_li}>
                                <span className="fa-li"></span>
                                <p className="font-weight-bold">
                                {item.name}
                                <button style={position.left} onClick={this.handleItemRemoval.bind(this, idx)} type="button" className="close" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                                </p> 
                               
                                <div className="input-group mb-3">
                                <input type="text" 
                                    value={this.props.shoppingList.items[idx].quantity}
                                    onChange={this.handleOnQuantityChange.bind(this, idx)}
                                    className="form-control" 
                                    placeholder="Shopping List Ingredient" 
                                    aria-label="Shopping List Ingredient" 
                                    aria-describedby="basic-addon2"/>
                                <div className="input-group-append">
                                    <span className="input-group-text" id="basic-addon2">{item.unity}</span>
                                </div>
                                </div>
                            </li>
                            )
                        })}
                       </ul>

                       <h6>Insert a new item</h6>
                        <AutoSuggest theme={theme}
                            handleSelection={this.handleNewIngredientSelection.bind(this)}
                            renderSuggestion={this.renderIngredientSuggestion.bind(this)}
                            onSuggestionsFetchRequested ={this.fetchIngredientsBySuggestion.bind(this)}
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
        loading : state.shoppingList.loading
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

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingListEdit)