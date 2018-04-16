import React from 'react';
import PropTypes from 'prop-types';

export default class DifficultySelection extends React.Component{

  constructor(props){
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e){ this.props.onDifficultyClick(e.target.innerHTML); }

  render(){
    return (
      <div>
        <h2 style={{textAlign: 'center', fontSize: '300%'}}>Select your difficulty</h2>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            width: '70vw'
          }} >
          <h2 style={{cursor: 'pointer', flex: '1', fontSize: '250%'}} onClick={this.onClick}>Easy</h2>
          <h2 style={{cursor: 'pointer', flex: '1', fontSize: '250%'}} onClick={this.onClick}>Medium</h2>
          <h2 style={{cursor: 'pointer', flex: '1', fontSize: '250%'}} onClick={this.onClick}>Hard</h2>
          <h2 style={{cursor: 'pointer', flex: '1', fontSize: '250%'}} onClick={this.onClick}>Extreme</h2>
        </div>
      </div>
    )
  }
}

DifficultySelection.propTypes = {
  onDifficultyClick: PropTypes.func.isRequired
}
