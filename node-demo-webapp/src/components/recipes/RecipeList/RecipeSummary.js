import React from 'react'
import { Link } from 'react-router-dom'
import Style from '../../../pantrycook-features'
import { isAuthenticated } from './../../../storageUtils'

const image = Style.image

const RecipeSummary = ({recipe}) => {
  const auth = isAuthenticated()
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
                <span className="badge badge-primary">Owned ingredients: {recipe.pantryIngredientsPercentage}%</span>
              }</div>
            </h6>
            <h6 className="card-subtitle mb-2 text-muted">
            <div className="dropdown-divider"/>
              {recipe.categories &&
                recipe.categories.map(r => {
                  return <div key={r}><span className="badge badge-secondary">{r}</span><span> </span></div>
                })
              }
            </h6>
          </div>
        </div>
      </div>
    )
}

export default RecipeSummary