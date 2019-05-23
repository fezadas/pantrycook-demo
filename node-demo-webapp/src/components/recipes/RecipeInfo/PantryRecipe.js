import React from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import AlertRedirect from '../../auth/AlertRedirect'
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

    makeRecipe(ingredients) {  
        let updatedIngs = []
        ingredients.forEach(ing => {
            if(ing.quantity != null)
                updatedIngs.push({
                    'id': ing.id,
                    'quantity': ing.quantity
                })
        });
        this.props.updatePantryIngredientsQuantity(
            updatedIngs, 
            () => this.props.navigateToPantry(),
            () => this.props.getPantryRecipeInfo(this.props.id))
    }

    createShoppingList(ingredients) {
        /*let id = this.props.shoppingListState.createdId
        if(id)
            return this.props.navigateToShoppingList(id)*/

        let shoppingList = {
            'Name': `'${this.props.res.name}'`,
            'Items': []
        }
        ingredients.forEach(ing => {
            if(ing.quantity != null && ing.userQuantity < ing.quantity)
                shoppingList.Items.push({
                    'idIngredient': ing.id,
                    'quantity': ing.quantity - ing.userQuantity
                })
        });
        this.props.createShoppingList(
            shoppingList, 
            (id) => this.props.navigateToShoppingList(id))
        
    }

    render() {
         
        const { loading, res, error, shoppingListState, pantryState } = this.props
        console.log('this.props.res')
        console.log(res)
        const ownedIngredientsPercentage = res 
            ? (res.numOwnedIngredients / res.ingredients.length) * 100
            : null
            
        return (
            <div style={position.top_not_centered} className="container">
            <div className="dropdown-divider"></div>

            {error && 
                <div>
                    {error.statusCode == 401 
                        ? (<AlertRedirect/>) 
                        : (<div style={position.centered_1}><ErrorAlert /></div>)}
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
                    <img style={image.size} src={res.pictureUrl} className="card--top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">
                            {res.name}
                        </h5>
                        <p><a href={res.youtubeUrl}>
                            Youtube demo
                        </a></p>   
                        <p className="card-text">
                            {res.description}
                        </p>   
                        <p>Categories</p>      
                        {res.categories.map(cat => 
                            <p key={cat} style={card.display} className="card-text">
                                <small className="text-muted">{cat} </small>
                            </p>)
                        }
                    </div>
                </div>
                {ownedIngredientsPercentage == 100 ? (
                    <div>
                        <button onClick={this.makeRecipe.bind(this, res.ingredients)}>
                            Make recipe
                        </button>
                        {!pantryState.loading && <p>loading...</p>}
                        {pantryState.error && <AlertRedirect/>}
                    </div>
                ) : (
                    <div>
                        <button type="button" className="btn btn-primary" 
                            onClick={this.createShoppingList.bind(this, res.ingredients)} 
                            disabled={!shoppingListState.loading}>
                            Create Shopping List based on missing ingredients
                        </button>
                        {!shoppingListState.loading && <p>loading...</p>}
                        {shoppingListState.error && <p>something went wrong</p>}
                    </div>
                )}
                <IngredientsList ingredients={ res.ingredients}/>                  
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