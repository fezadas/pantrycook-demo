import React from 'react'
import { connect } from 'react-redux'
import { getRecipes } from './../../store/actions/adminActions'
import ErrorAlert from './../layout/ErrorAlert'
import Style from './../../pantrycook-features'

const position = Style.position
const list = Style.list
const image = Style.image

class RecipeList extends React.Component {

    componentDidMount() {
        this.props.getRecipes()
    }
    
    render(){
        const {loading,error,info} = this.props
        if(info){
            return(
                <div>
                    <div class="jumbotron mt-3">
                    <p class="lead">Number of recipes: {info.size}</p>
                    <p class="lead">Number of ingredients: unknown </p>
                    <p class="lead">Number of users: unknown</p>
                    <a class="btn btn-lg btn-primary" href="" role="button">Add Recipe »</a>
                    </div>
                    <ul style={position.top_not_centered_2} className="list-group">
                        {info.recipes.map(recipe => {
                            return(
                            <li key={recipe.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <span><img src={recipe.pictureUrl} style={image.small} /></span>
                                {recipe.name} 
                                <span className="badge badge-primary badge-pill">
                                    {recipe.categories[0]} | {recipe.categories[1]}
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