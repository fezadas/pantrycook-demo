import React from 'react'
import Ingredient from './../ingredient/Ingredient'
import Style from './../../pantrycook-features'

const image = Style.image
const position = Style.position
/**
 * Represents the List of Pantry Ingredients
 */
const Pantry = ({ingredients})=>{
        return (
            <div>
                <div className="dropdown-divider"></div>
                <div className="row">
               {ingredients && ingredients.length > 0 && ingredients.map(ingredient => {
                    return (
                            <Ingredient key={ingredient.Id} ingredient={ingredient}/>
                    )
                })}
                </div>
                {ingredients && ingredients.length == 0 && 
                    <div>
                    <img style = {image.small} src="/images/sad.png" className="rounded mx-auto d-block" alt=""/>
                    <p>No ingredients to show.</p>
                    </div>
                }
            </div>
    )
}

export default Pantry