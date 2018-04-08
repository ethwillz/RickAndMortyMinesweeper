import React from 'react';
import PropTypes from 'prop-types';

const GameBoard = ({spaces}) => (
  <div>
    <table>
      <tbody>
        {spaces.map((row, i) => <tr key={i}>{row}</tr>)}
      </tbody>
    </table>
  </div>
)

GameBoard.propTypes = {
  spaces: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        numBombs: PropTypes.number.isRequired,
        boardDimension: PropTypes.string.isRequired,
        spaceState: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
      }).isRequired
    ).isRequired
  ).isRequired,
}

export default GameBoard;
