import React from 'react';
import PropTypes from 'prop-types';

export default class Board extends React.Component{

  render(){
    return (
      <div>
        <table>
          <tbody>
            {this.props.spaces.map((row, i) => <tr key={i}>{row}</tr>)}
          </tbody>
        </table>
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
