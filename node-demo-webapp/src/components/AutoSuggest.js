import React from 'react'
import Autosuggest from 'react-autosuggest'
import { debounce } from 'throttle-debounce'

class AutoSuggest extends React.Component {
  state = {
    value: '',
    suggestions: []
  }

  componentWillMount() {
    this.onSuggestionsFetchRequested = debounce(
      500,
      this.onSuggestionsFetchRequested
    )
  }

  renderSuggestion = suggestion => {
    return this.props.renderSuggestion(suggestion)
  }

  onChange = (event, { newValue }) => {
    this.setState({ value: newValue })
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.props.onSuggestionsFetchRequested(value)
      .then(res => {
        this.setState({ suggestions: res })
      })
      .catch(err => {} )
  }

  onSuggestionsClearRequested = () => {
    this.setState({ suggestions: [] })
  }

  onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    this.props.handleSelection(suggestion)
  }

  render() {
    const { value, suggestions } = this.state

    const inputProps = {
      placeholder: '',
      value,
      onChange: this.onChange
    }

    return (
      <div>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={suggestion => ''}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
          onSuggestionSelected={this.onSuggestionSelected}
        />
      </div>
    )
  }
}

export default AutoSuggest