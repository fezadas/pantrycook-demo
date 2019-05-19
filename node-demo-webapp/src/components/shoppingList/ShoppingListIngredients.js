import React from 'react'
import Style from '../../pantrycook-features'

const shopping = Style.shoppingList

const ShoppingListIngredients = ({items}) => {
    return (
        <ul style={shopping.ul_center} className="fa-ul">
            {items && items.map(item =>{
                return(
                <li style={shopping.pricing_ul_li}><span className="fa-li"><i className="fas fa-check"></i></span>
                <span className="font-weight-bold">{item.name}</span> {item.quantity} <span className="font-italic">{item.unity}</span> </li>
                )
            })}
        </ul>
    )
}

export default ShoppingListIngredients