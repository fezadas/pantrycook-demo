import React from 'react'
import Ingredient from './../ingredient/Ingredient'

/**
 * Represents the List of Pantry Ingredients
 */

const Pantry = ({ingredients})=>{
        return (
            <div>
                <div className="dropdown-divider"></div>
                <div className="row">
               {ingredients && ingredients.map(ingredient => {
                    return (
                            <Ingredient key={ingredient.Id} ingredient={ingredient}/>
                    )
                })}
            </div>
            </div>
    )
}

export default Pantry