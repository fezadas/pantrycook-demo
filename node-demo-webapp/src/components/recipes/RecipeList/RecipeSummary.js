import React from 'react'
import { Link } from 'react-router-dom'
import Style from '../../../pantrycook-features'
import RecipeIngredientBadge from "./RecipeIngredientBadge"
import { isAuthenticated } from './../../../storageUtils'


const image = Style.image
const size = Style.card

const RecipeSummary = ({recipe}) => {
    return ( 
      <div className="col-sm">
        <div className="card text-center" >
          <br/>
          <img className="card-img-top" src={recipe.pictureUrl} key={recipe.id} style={image.centered_2} alt="Card image cap"/>
          <div className="card-body">
            {recipe.name.length > 27 && 
            <h6 style={size.size_header} className="card-title">
                <Link to={`/recipes/${recipe.id}`} key={recipe.id}>
                  {recipe.name}
                </Link>
                <div>
                  {isAuthenticated() && recipe.pantryIngredientsPercentage >= 0 && 
                  <RecipeIngredientBadge percentage={recipe.pantryIngredientsPercentage}/>  
                  }
                </div>
            </h6>
            }
            {recipe.name.length <= 27 && 
            <h6 className="card-title">
                <Link to={`/recipes/${recipe.id}`} key={recipe.id}>
                  {recipe.name}
                </Link>
                <div>
                  {isAuthenticated() && recipe.pantryIngredientsPercentage >= 0 && 
                  <RecipeIngredientBadge percentage={recipe.pantryIngredientsPercentage}/>  
                  }
                </div>
            </h6>
            }
            <h6 className="card-subtitle mb-2 text-muted">
            <div className="dropdown-divider"/>
            <div>
              {recipe.categories &&
                recipe.categories.map(r => {
                  return <span key={r}> <span className="badge badge-secondary">{r}</span></span>
                })
              }
            </div>
            </h6>
          </div>
        </div>
        <br></br>
      </div>
    )
}

export default RecipeSummary