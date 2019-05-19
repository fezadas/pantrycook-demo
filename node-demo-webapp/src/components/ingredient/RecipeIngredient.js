import React from 'react'

const RecipeIngredient = ({ingredient}) => {
    const auth = localStorage.getItem('access_token')
    let quantity = ingredient.quantity == 0.5 ? "1/2" : ingredient.quantity
    let unity = ingredient.unity.length > 2 ? "" : ingredient.unity //FIXME !!!
    return (
        <div>
            <p>
                <div>
                    {ingredient.name}
                    {ingredient.quantity != null && <text> - {quantity} {ingredient.unity}</text>}
                </div>
                <div>
                    {auth && ingredient.quantity != null && 
                        <text>Quantity owned: {ingredient.userQuantity} {unity}</text>}
                </div>
            </p> 
        </div>
    )
}

export default RecipeIngredient