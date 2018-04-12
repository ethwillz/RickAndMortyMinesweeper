import React from 'react';
import PropTypes from 'prop-types';
import Ad from './Ad';

export default class Board extends React.Component{

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
}
