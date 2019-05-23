import React from 'react'
import { Link } from 'react-router-dom'
import Style from '../../../pantrycook-features'

const image = Style.image
const card = Style.card

const RecipeSummary = ({recipe}) => {
  const auth = localStorage.getItem('access_token')
    return ( 
      <div className="col-sm">
        <div className="card text-center" >
          <img className="card-img-top" src={recipe.pictureUrl} key={recipe.id} style={image.centered_2} alt="Card image cap"/>
          <div className="card-body">
            <h6 className="card-title">
              <Link to={`/recipes/${recipe.id}`} key={recipe.id}>
                {recipe.name}
              </Link>
              <div>{auth && recipe.pantryIngredientsPercentage >= 0 && 
              <span class="badge badge-primary">Owned ingredients: {recipe.pantryIngredientsPercentage}%</span>
              }</div>
            </h6>
            <h6 className="card-subtitle mb-2 text-muted">
            <div className="dropdown-divider"/>
              {recipe.categories &&
                recipe.categories.map(r => {
                  return <div><span class="badge badge-secondary" key={r}>{r}</span><span> </span></div>
                })
              }
            </h6>
          </div>
        </div>
      </div>
    )
}

export default RecipeSummary