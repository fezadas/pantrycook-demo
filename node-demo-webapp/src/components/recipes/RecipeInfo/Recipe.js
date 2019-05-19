import React from 'react'
import { connect } from 'react-redux'
import RecipeIngredient from '../../ingredient/RecipeIngredient'
import { fetchRecipeInfo } from '../../../store/actions/recipeActions'
import ErrorAlert from './../../layout/ErrorAlert'
import IngredientsList from '../../ingredient/IngredientsList'
import Style from '../../../pantrycook-features'

const position = Style.position
const image = Style.image
const card = Style.card

class Recipe extends React.Component {

    componentDidMount() {
        this.props.getRecipeInfo(this.props.id)
    }

    render() {
        const { loading, res, error } = this.props
        if(error)
            return(
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
        
        //falta adicionar categorias e ingredientes
        return (
            <div style={position.top_not_centered} className="container">
                {res && 
                <div>
                <div className="card mb-3">
                <img style={image.size} src={res.pictureUrl} className="card--top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{res.name}</h5>
                    <p><a href={res.youtubeUrl}>Youtube demo</a></p>   
                    <p className="card-text">{res.description}</p>   
                    <p>Categories</p>      
                    {res.categories.map(cat => <p key={cat} style={card.display} className="card-text"><small className="text-muted">{cat}  </small></p>)}
                </div>
                </div>
                <div>
                    <IngredientsList auth = {true} ingredients = {res.ingredients}/>     

                </div>
                </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        res: state.recipe.recipeInfo,
        error: state.recipe.error,
        loading : state.recipe.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getRecipeInfo: (id) => dispatch(fetchRecipeInfo(id))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Recipe)