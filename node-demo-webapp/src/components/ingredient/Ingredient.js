import React from 'react'
import Style from '../../pantrycook-features'

const list = Style.list
const image = Style.image
const card = Style.card

const Ingredient = ({ingredient}) => {
    return (
        <div key={ingredient.Id}>
                    <div className="col-sm">
                    <div className="card text-center" style={card.width}>
                       <h5 className="card-title">
                           {ingredient.Name}
                       </h5>
                       <img style = {image.small} src={ingredient.PictureUrl}/>
                       <div className="card-body">
                           <h6 className="card-subtitle mb-2 text-muted">
                               {ingredient.Quantity} {ingredient.Unity}
                           </h6>
                    </div>
                </div>
            </div>  
        </div>
    )
}

export default Ingredient
