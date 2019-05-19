import React from 'react'
import { Link } from 'react-router-dom'
import Style from '../../../pantrycook-features'

const image = Style.image
const card = Style.card

const RecipeSummary = ({recipe}) => {
  const auth = localStorage.getItem('access_token')
    return ( 
      <div className="col-sm">
        <div className="card text-center" style={card.size}>
          <img className="card-img-top" src={recipe.pictureUrl} key={recipe.id} style={image.centered_2} alt="Card image cap"/>
          <div className="card-body">
            <h5 className="card-title">
              <Link to={`/recipes/${recipe.id}`} key={recipe.id}>
                {recipe.name}
              </Link>
              <div>{auth && recipe.pantryIngredientsPercentage >= 0 && 
                <p>Owned ingredients: {recipe.pantryIngredientsPercentage}%</p>}</div>
            </h5>
            <h6 className="card-subtitle mb-2 text-muted">
              {recipe.categories &&
                recipe.categories.map(r => {
                  return <p key={r}>{r}</p>
                })
              }
            </h6>
          </div>
        </div>
      </div>
    )
}

export default RecipeSummary