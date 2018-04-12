import React from 'react';
import PropTypes from 'prop-types';
import Ad from './Ad';

export default class Board extends React.Component{

  constructor(props){
    super(props);
    this.tick = this.tick.bind(this);
  }

  componentDidMount(){
    this.props.startTimer;
  }

  render(){
    return (
      <div>
        <Ad />
        <table>
          <tbody>
            {this.props.spaces.map((row, i) => <tr key={i}>{row}</tr>)}
          </tbody>
        </table>
        <Ad />
      </div>
    )
  }
}

Board.propTypes = {
  spaces: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape().isRequired
    ).isRequired
  ).isRequired,
  starTimer: PropTypes.func.isRequired;
}
