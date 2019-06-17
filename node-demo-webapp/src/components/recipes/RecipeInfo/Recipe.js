import React from 'react'
import { connect } from 'react-redux'
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
            return (
                <div style={position.centered}>
                    <ErrorAlert />
                </div>
            ) 
            
        if(loading)
            return (
                <div style = {position.centered} className="text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                </div>
            )
        
        return (
            <div style={position.top_not_centered} className="container">
                {res && 
                <div>
                <div className="card mb-3">
                <br/>
                <img style={image.size} src={res.pictureUrl} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{res.name}</h5>
                    <p><a href={res.youtubeUrl}>Youtube demo</a></p>   
                    <p className="card-text">{res.description}</p>   
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
                <div>
                    <IngredientsList auth = {true} ingredients = {res.ingredients}/>     
                </div>
                <br/>
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