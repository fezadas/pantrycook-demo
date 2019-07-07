import React from 'react'
import { connect } from 'react-redux'
import { getRecipes } from './../../store/actions/adminActions'
import Style from './../../pantrycook-features'
import RecipeList from './RecipeList';


class Tools extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount(){  
       
    }

    render(){
        return <RecipeList />
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      getRecipes: () => dispatch(getRecipes())
    }
}

const mapStateToProps = (state) => {
    return {
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Tools)