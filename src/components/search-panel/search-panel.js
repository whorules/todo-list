import React, { Component } from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {

  state = {
    textToSearch: ''
  };

  onSearchChange = (event) => {
    const textToSearch = event.target.value;
    this.setState({ textToSearch });
    this.props.onSearchChange(textToSearch);
  };

  render() {
    return (
    <input type="text"
              className="form-control search-input"
              placeholder="type to search"
              value={ this.state.textToSearch }
              onChange={ this.onSearchChange } />
    )};
}
