/**
 * Class with JAVASCRIPT Objects containing css properties 
 * in order to use them in React Components.
 */
const style = {
    shoppingList : {

        section_pricing : {
            background: '#007bff',
            background: 'linear-gradient(to right, #0062E6, #33AEFF)'
        },
        pricing_card : { 
            border: 'none',
            'borderRradius': '1rem',
            transition: 'all 0.2s',
            boxShadow: '0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1)'
        },
        pricing_hr : { 
            margin: '1.5rem 0'
        },
        pricing_card_title : { 
            margin: '0.5rem 0',
            fontSize: '0.9rem',
            letterSpacing: '.1rem',
            fontWeight: 'bold'
        },
        pricing_card_price : { 
            fontSize: '3rem',
            margin: '0'
        },
        pricing_btn : { 
            fontSize: '80%',
            borderRadius: '5rem',
            letterSpacing: '.1rem',
            fontWeight: 'bold',
            padding: '1rem',
            opacity: '0.7',
            transition: 'all 0.2s'
        }
    },
    position : {
        top : {
            'position': 'absolute',
            'top': '60px',
            'margin': 'auto',
            'marginLeft': 'auto',
            'marginRight': 'auto',
            'left': 0,
            'right': 0
        },
        top_not_centered : {
            top:'60px',
            'position': 'absolute',
        },
        top_not_centered_2 : {
            top:'60px',
            'marginLeft': 'auto',
            'marginRight': 'auto',
            width:"50%"
        },
        centered : {
            display: 'flex',
            'flexDirectionDirection': 'column',
            'justifyContent': 'center',
            'alignItems': 'center',
            'textAlign': 'center',
            'minHeight': '100vh'
        },
        centered_top : {
            'top': '60px',
            'position': 'absolute',
            top:'60px',
            'marginLeft': 'auto',
            'marginRight': 'auto',
        },
        centered_style : {
            display: 'flex',
            top:'60px',
            'flexDirectionDirection': 'column',
            'justifyContent': 'center',
            'alignItems': 'center',
            'textAlign': 'center',
            'minHeight': '70vh'
        },
        list_centered_style : {
            'position': 'absolute',
            'top': '60px',
            'margin': 'auto',
            'marginLeft': 'auto',
            'marginRight': 'auto',
            'left': 0,
            'right': 0
        },
        top_padding : {
            topPadding:'15px'
        },
        bottom : {
            position:'relative',
            bottom:'280px'
        },
        left : {
            position: 'absolute',
            left: 'auto'
        },
        textAlign: {
            textAlign:"center",
            margin:'auto'
        }
    },
    form : {
        input_style_1 : {
            position: 'relative',
            display: 'inline-block',
            left:'35px'
        },
        input_style_2 : {
            position: 'relative',
            left:'30px',
        },
        button_left_padding : {
            position: 'relative',
            left:'30px',
        },
        button_right_padding : {
            position: 'relative',
            right:'30px',
        },
        button_space : {
            margin:'5px'
        },
        top_padding : {
            position: 'relative',
            top:'5px',
        },
        centered : {
            marginLeft: 'auto',
            marginRight: 'auto' 
        },
        edit_box_position : {
            width: '150px',
            left:'120px'
        },
        size_100 :{
            marginLeft: 'auto',
            marginRight: 'auto' ,
            width: 'auto',
            textAlign:'center'
        },
        size_text_area :{
            marginLeft: 'auto',
            marginRight: 'auto' ,
            width: '500px',
            textAlign:'center'
        },
        size_input :{
            marginLeft: 'auto',
            marginRight: 'auto' ,
            width: '350px',
            textAlign:'center'
        }
    },
    autoSuggest : {
        container :{
            position: 'relative'
        },
          
        input :{
        width: '240px',
        height: '30px',
        padding: '10px 20px',
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: '300',
        fontSize: '16px',
        border: '1px solid #aaa',
        borderRadius: '4px'
        }
        ,
        inputFocused :{
        outline:'none'
        }
        ,
        inputOpen :{
        'border-bottom-left-radius': 0,
        'border-bottom-right-radius': 0,
        }
        ,
        suggestionsContainer : {
        display: 'none'
        }
        ,
        suggestionsContainerOpen :{
        display: 'block',
        position: 'absolute',
        top: '51px',
        width: '280px',
        border: '1px solid #aaa',
        'background-color': '#fff',
        'font-family': 'Helvetica, sans-serif',
        'font-weight': '300',
        'font-size': '16px',
        'border-radius': '0 0 4px 4px',
        'z-index': '2'
        },
        
        suggestionsList : {
        margin: '0',
        padding:'0',
        'list-style-type': 'none'
        },
        
        suggestion : {
        cursor: 'pointer',
        padding: '10px 20px',
        },
        suggestionHighlighted :{
        'background-color': '#ddd'
        },
        ul_suggestions : {
            position: 'absolute',
            left:'auto',
            top: '170px',
            cursor:'pointer'
        },
        list_style : {
          position: 'inherit',
          'top': '350px',
        }
    },
    image : {
        centered_1 : {
            width:'2em',
            display:'block',
            'marginLeft':'auto',
            'marginRight': 'auto'
        },
        centered_2 : {
            width:'13em',
            display:'block',
            'marginLeft':'auto',
            'marginRight': 'auto'
        },
        size : {
            width:'18em',
            'marginLeft':'auto',
            'marginRight': 'auto'
        },
        size_2 : {
            width: '200px',
            height: '250px',
            margin: 'auto'
        },
        small : {
            width: '60px',
            height: '60px',
            margin: 'auto'
        }
    },
    list : {
        row_width : {
            width: '21.5rem'
        },
        row_width_2 : {
            width: '17.5rem'
        },
        ul_style : {
            display:'inline-table'
        },
        ul_style_left : {
            display:'inline-table',
            align:"left"
        },
        li_style : {
            width: '21.5rem',
            display:'inline'
        },
        center : {
            'textAlign':'center'
        },
        top : {
            position: 'inherit',
            'top': '350px',
          },
        inherit : {
            position: 'inherit'
        }  
    },
    card : {
        width : {
            width: '21.5rem'
        },
        size_33 : {
            width:"33.5rem"
        },
        size_12 : {
            width: '12.5rem'
        },
        size_18 : {
            width: '18.5rem'
        },
        display : {
            display: 'inline'
        },
        recipe_size : {
            width: '21.5rem',
            height:'21.5rem'
        },
        pointer: {
            cursor:'pointer'
        },
        size_header:{
            fontSize: '0.85em',
            fontWeight: 'bold',
        }
    },
    link: {
        pointer: {
            cursor:'pointer'
        },
        disable: {
            pointerEvents:'none'
        }
    }
    
}

export default style
