import React from 'react'
import Recipe from './Recipe'
import PantryRecipe from './PantryRecipe'

class RecipeInfo extends React.Component {
    render() {
        const auth = localStorage.getItem('access_token')
        const r_id = this.props.match.params.r_id
        return ( 
            <div>
                {auth ? (<PantryRecipe id={r_id}/>) : (<Recipe id={r_id}/>)}
            </div>
        )
    }
}

export default RecipeInfo