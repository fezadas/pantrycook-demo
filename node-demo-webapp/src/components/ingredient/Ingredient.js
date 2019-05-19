import React from 'react'
import Style from '../../pantrycook-features'

const list = Style.list

const Ingredient = ({ingredient}) => {
    return (
        <div className="col-sm">
             <div className="card text-center" style={list.row_width}>
                <h5 className="card-title">
                    {ingredient.Name}
                </h5>
                <i className="fas fa-drumstick-bite fa-3x"></i>
                <div className="card-body">
                    <h6 className="card-subtitle mb-2 text-muted">
                        {ingredient.Quantity} {ingredient.Unity}
                    </h6>
                </div>
            </div>
        </div>
    )
}

export default Ingredient