import React from 'react'
import { connect } from 'react-redux'
import { getRecipes,deleteRecipe } from './../../store/actions/adminActions'
import ErrorAlert from './../layout/ErrorAlert'
import Style from './../../pantrycook-features'
import { push } from 'connected-react-router'

const position = Style.position
const card = Style.card
const image = Style.image

class RecipeList extends React.Component {

    removeItem(id) {
        console.log(id)
        this.props.deleteRecipe(id);
    }

    componentDidMount() {
        this.props.getRecipes() 
    }

    render(){
        const {loading,error,info} = this.props

        console.log(info)

        if(info){
            return(
                <div>
                    <div className="jumbotron mt-3">
                    <p className="lead">Number of recipes: {info.size}</p>
                    <button onClick={this.props.navigateToRecipe.bind(this)} className="btn btn-lg btn-primary">
                        Add Recipe »</button>
                    <span> </span>
                    <button onClick={this.props.navigateToRecipeMealDb.bind(this)} className="btn btn-lg btn-primary">
                        Add Recipe from MealDb »</button>
                    </div>
                    <ul style={position.top_not_centered_2} className="list-group">
                        {info.recipes.map(recipe => {
                            return(
                            <li key={recipe.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <span><img src={recipe.pictureUrl} style={image.small} /></span>
                                {recipe.name} 
                                <span className="badge badge-primary badge-pill">
                                {recipe.categories.map(cat => {
                                    return(
                                     <span key={cat}> {cat}  </span>
                                 )
                                })}</span> 
                                <span style={card.pointer} onClick={this.removeItem.bind(this,recipe.id)} className="badge badge-danger badge-pill">
                                    Delete
                                </span>
                            </li>)
                        })}
                    </ul>
                </div>
            )
        }
        else return null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      getRecipes: () => dispatch(getRecipes()),
      navigateToRecipe: () => dispatch(push('/tools/recipe')),
      navigateToRecipeMealDb: () => dispatch(push('/tools/recipemealdb')),
      deleteRecipe: (id) => dispatch(deleteRecipe(id))
    }
}

const mapStateToProps = (state) => {
    return {
        loading:state.admin.loading,
        error:state.admin.error,
        info:state.admin.recipes
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(RecipeList)