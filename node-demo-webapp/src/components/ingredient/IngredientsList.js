import React from 'react'
import Style from '../../pantrycook-features'
import { isAuthenticated } from './../../storageUtils'

const list = Style.list

const IngredientsList = ({ ingredients }) => {
    if(isAuthenticated()) {
      return (
        <div style = {list.center}>
        <div className="dropdown-divider"></div>
        <h5>Ingredients</h5>
        <ul style = {list.ul_style} className="list-group">
        {ingredients.map(elem => {
            const q = elem.quantity == null ? 0 : elem.quantity
            return(
            <li key={elem.id} style = {list.li_style} className="list-group-item d-flex justify-content-between align-items-center">
            {elem.name}
            {
              elem.userQuantity !== 0 && elem.userQuantity >= q ?
              <span className="badge badge-success badge-pill">{elem.recipeQuantity} {elem.unity}</span>
              :
              <span className="badge badge-danger badge-pill">{elem.recipeQuantity} {elem.unity}</span>
            }
          </li>
        )})}
      </ul>
      </div>
    )
  } 
  else {
    return (
        <div style = {list.center}>
        <div className="dropdown-divider"></div>
        <h5>Recipe Ingredients</h5>
        <ul style = {list.ul_style} className="list-group">
        {ingredients.map(elem => {
            return(
            <li key={elem.id} style = {list.li_style} className="list-group-item d-flex justify-content-between align-items-center">
            {elem.name}
            <span className="badge badge-primary badge-pill">{elem.quantity} {elem.unity}</span>
          </li>
        )})}
      </ul>
      </div>
    )
  }
}

export default IngredientsList