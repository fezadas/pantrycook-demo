import React from 'react'
import RecipeSummary from './RecipeSummary'
import { connect } from 'react-redux'
import { fetchRandomRecipes } from '../../../store/actions/recipeActions'
import ErrorAlert from '../../layout/ErrorAlert'
import Style from '../../../pantrycook-features'

const position = Style.position

class Recipes extends React.Component {

    componentDidMount() {
        this.props.getRandomRecipes(12)
    }
    
    render() {
        const { loading, res, error } = this.props
        if(error)
            return(
            <div style={position.bottom}>
                <ErrorAlert />
            </div>)
        if(loading){
            return(
            <div className="text-center">
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            </div>)
        }
        if(res) {
            const recipes = res.recipes //res = { size, recipes }
            return (
                <div className="row text-center">
                   {recipes && recipes.map(recipe => 
                        <RecipeSummary key={recipe.id} recipe={recipe}/>
                    )}
                </div>
            )
        }
        return (<div></div>)
    }
}

const mapStateToProps = (state) => {
    return {
        res: state.recipe.recipes,
        error: state.recipe.error,
        loading: state.recipe.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getRandomRecipes: (number) => dispatch(fetchRandomRecipes(number))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Recipes)