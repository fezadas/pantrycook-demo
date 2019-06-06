import React from 'react'
import { connect } from 'react-redux'
import { push, replace } from 'connected-react-router'
import { fetchShoppingList, deleteShoppingList, addShoppingListItemsToPantry } from '../../store/actions/shoppingListActions'
import ShoppingListIngredients from './ShoppingListIngredients'
import ErrorAlert from '../layout/ErrorAlert'
import Style from '../../pantrycook-features'
import { isAuthenticated } from './../../storageUtils'

const shopping = Style.shoppingList
const position = Style.position

class ShoppingList extends React.Component {

    state = {
        id: null
    }

    componentDidMount() {
        if(!isAuthenticated()){
            this.props.redirectLogin()
        }
        else{
            const sl_id = this.props.match.params.sl_id
            this.state.id = sl_id
            this.props.getShoppingList(sl_id)
        }
    }

    handleAddItemsToPantry() {
        this.props.addItemsToPantry(
            this.state.id,
            () => {
                this.props.navigateToPantry()
            })
    }

    handleDelete() {
        this.props.deleteList(
            this.state.id,
            () => {
                this.props.navigateToAllLists()
            })
    }

    render() {
        const { loading, shoppingList, error } = this.props
        if(error)
            return (
                <div style={position.centered_style}>
                    <ErrorAlert error={error.body}/>
                </div>
            )
            
        if(loading) 
            return (
                <div style = {position.centered_style} className="text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                </div>
            )
            console.log(shoppingList)
        return (
            <div>
            <div className="dropdown-divider"></div>  
            <section style = {shopping.section_pricing} className="pricing py-5">
            <div className="container" >
            <div className="row" style={position.centered_style}>
                {shoppingList && 
                    <div className="col-lg-4">
                    <div style = {shopping.pricing_card} className="card mb-5 mb-lg-0">
                    <div className="card-body">
                        <h5 style = {shopping.pricing_card_title} className="card-title text-muted text-uppercase text-center">
                            Shopping List
                        </h5>
                        <h6 style = {shopping.pricing_card_price} className="card-price text-center">
                            {shoppingList.name}
                        </h6>
                        <button onClick={() => this.props.navigateToEdit(this.state.id)} disabled={this.state.loading}>
                            Edit
                        </button>
                        <button onClick={() => this.handleDelete(this.state.id)} disabled={this.state.loading}>
                            Delete
                        </button>
                        <hr style={shopping.pricing_hr}></hr>
                        {
                            shoppingList.items && shoppingList.items.length <= 0 ?
                            <p>Nothing To Show</p>
                            :
                            <div>
                                <ShoppingListIngredients items={shoppingList.items}/>
                                <button style = {shopping.pricing_btn} className="btn btn-block btn-primary text-uppercase"
                                    onClick={this.handleAddItemsToPantry.bind(this)}
                                    disabled={this.state.loading}>
                                    Add Items to Pantry
                                </button> 
                            </div>
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
        getShoppingList: (id) => dispatch(fetchShoppingList(id)),
        deleteList: (id, afterSuccess) => dispatch(deleteShoppingList(id, afterSuccess)),
        addItemsToPantry: (id, afterSuccess) => dispatch(addShoppingListItemsToPantry(id, afterSuccess)),
        redirectLogin: () => dispatch(replace('/signin')),
        navigateToEdit: (id) => dispatch(push(`/shoppinglists/${id}/edit`)),
        navigateToPantry: () => dispatch(push(`/pantry`)),
        navigateToAllLists: () => dispatch(push('/shoppinglists'))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ShoppingList)