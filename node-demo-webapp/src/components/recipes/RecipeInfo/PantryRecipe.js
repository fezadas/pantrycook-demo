import React from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import ErrorAlert from '../../layout/ErrorAlert'
import { fetchPantryRecipeInfo } from '../../../store/actions/pantryRecipeActions';
import { updatePantryIngredientsQuantity } from '../../../store/actions/pantryActions';
import { createShoppingList } from '../../../store/actions/shoppingListActions'
import IngredientsList from '../../ingredient/IngredientsList'
import Style from '../../../pantrycook-features'

const position = Style.position
const image = Style.image
const card = Style.card

class PantryRecipe extends React.Component {

    componentDidMount() {
        this.props.getPantryRecipeInfo(this.props.id)
    }

    makeRecipe() { 
        this.props.updatePantryIngredientsQuantity(
            this.props.id, 
            () => this.props.navigateToPantry(),
            () => this.props.getPantryRecipeInfo(this.props.id))
    }

    createShoppingList() {
        this.props.createShoppingList(
            {
                name: `'${this.props.res.name}'`,
                idRecipe: this.props.id
            }, 
            (id) => this.props.navigateToShoppingList(id))
        
    }

    render() {         
        const { loading, res, error, shoppingListState, pantryState } = this.props
        const ownedIngredientsPercentage = res 
            ? (res.numOwnedIngredients / res.ingredients.length) * 100
            : null
            

        return (
            <div style={position.top} className="container">
            <div className="dropdown-divider"></div>

            {error && 
                <div style={position.centered_1}>
                    <ErrorAlert />
                </div>
            }
            {loading &&
                <div style = {position.centered} className="text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                </div>
            }
            {res &&
                <div>
                <div className="card mb-3">
                <br/>
                    <img style={image.size} src={res.pictureUrl} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">
                            {res.name}
                        </h5>
                        <p><a href={res.youtubeUrl}>
                            Youtube demo
                        </a></p>   
                        <text className="card-text">
                            {res.description}
                        </text>   
                        <p className="font-weight-bold">Categories
                        <span> </span>
                         {res.categories.map(cat => 
                            <span key={cat} className="card-text">
                                <span className="badge badge-secondary"> {cat}</span><span> </span>
                            </span>)
                         }
                        </p>        
                        
                    </div>
                </div>
                {ownedIngredientsPercentage == 100 ? (
                    <div>
                        <button type="button" className="btn btn-primary"  onClick={this.makeRecipe.bind(this)}>
                            Make recipe
                        </button>
                        {!pantryState.loading && <p>Loading...</p>}
                        {pantryState.error && <ErrorAlert />}
                    </div>
                ) : (
                    <div>
                        <button type="button" className="btn btn-primary" 
                            onClick={this.createShoppingList.bind(this)} 
                            disabled={!shoppingListState.loading}>
                            Create Shopping List based on missing ingredients
                        </button>
                        {!shoppingListState.loading && <p>Loading...</p>}
                        {shoppingListState.error && <ErrorAlert />}
                    </div>
                )}
                <IngredientsList ingredients={ res.ingredients}/>   
                <br/>               
                </div>
            }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        res: state.pantryRecipe.recipeInfo,
        error: state.pantryRecipe.error,
        loading : state.pantryRecipe.loading,
        shoppingListState: state.shoppingList,
        pantryState: state.pantry
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPantryRecipeInfo: (id) => dispatch(fetchPantryRecipeInfo(id)),
        updatePantryIngredientsQuantity: (id, success, error) => 
            dispatch(updatePantryIngredientsQuantity(id, success, error)),
        createShoppingList: (shoppingList, action) => dispatch(createShoppingList(shoppingList, action)),
        navigateToShoppingList: (id) => dispatch(push(`/shoppinglists/${id}`)),
        navigateToPantry: () => dispatch(push('/pantry'))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PantryRecipe)