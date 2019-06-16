import React from 'react'

const badge_success =  "badge badge-success"
const badge_danger =  "badge badge-danger"
const badge_warning =  "badge badge-warning"

const RecipeIngredientBadge = ({percentage}) => {
        var current_badge
        console.log(percentage)
        if(percentage == 0) current_badge = badge_danger
        if(percentage > 0 && percentage < 100) current_badge = badge_warning
        if(percentage == 100) current_badge = badge_success

        return(
            <div>
                <span className = {current_badge}>
                Owned ingredients: {percentage}%
                </span>
            </div>
        )
}
export default RecipeIngredientBadge