import React from 'react';
import PropTypes from 'prop-types';

export default class DifficultySelection extends React.Component{

  constructor(props){
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e){
    this.props.onDifficultyClick(e.target.innerHTML);

    this.props.history.push("/play");
  }

  render(){
    return (
      <div>
        <h2>Select your difficulty</h2>
        <div>
          <h3 onClick={this.onClick}>Easy</h3>
          <h3 onClick={this.onClick}>Medium</h3>
          <h3 onClick={this.onClick}>Hard</h3>
        </div>
      </div>
    )
  }
}

DifficultySelection.propTypes = {
  onDifficultyClick: PropTypes.func.isRequired
}
