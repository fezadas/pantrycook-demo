import React from 'react'
import { connect } from 'react-redux'
import { getRecipes } from './../../store/actions/adminActions'
import ErrorAlert from './../layout/ErrorAlert'
import Style from './../../pantrycook-features'

const position = Style.position
const list = Style.list

class RecipeList extends React.Component {

    componentDidMount() {
        this.props.getRecipes()
    }
    
    render(){
        const {loading,error,info} = this.props
        if(info){
            return(
                <div>
                    <ul style={position.top_not_centered} className="list-group">
                        {info.recipes.map(recipe => {
                            return(
                            <li key={recipe.id} className="list-group-item d-flex justify-content-between align-items-center">
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