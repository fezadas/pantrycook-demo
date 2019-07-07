import React from 'react'
import Style from '../../pantrycook-features'

const position = Style.position
const form = Style.form

class AddNewBaseIng extends React.Component {

    render() {
        return(
        <div className="form-row">
                <div className="col">
                    <div>
                        <span class="input-group-text">State</span>
                    </div>
                    <select id="volume" onChange={this.props.handleChange} class="form-control">
                        <option selected></option>
                        <option>SOLID</option>
                        <option>LIQUID</option>
                    </select>
                </div>
                {this.newInput('Density', 'number', 'density')}
                {this.newInput('Name', 'text', 'name')}
                {this.newInput('Picture Url', 'text', 'pictureUrl')}
        </div>
        )
    }

    newInput(span, inputType, id, value) {
        return (
          <div class="col">
              <div>
                  <span class="input-group-text">{span}</span>
              </div>
              <input type={inputType} value={value} 
                id={id} onChange={this.props.handleChange} 
                class="form-control" aria-describedby="inputGroup-sizing-default"/>
          </div>
        )
      }
}
export default AddNewBaseIng