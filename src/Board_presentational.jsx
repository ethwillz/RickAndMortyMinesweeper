import React from 'react';
import PropTypes from 'prop-types';
import Space from './Space';

const Board = ({spaces}) => (
  <div>
    <table>
      <tbody>
        {spaces.map((row, i) => <tr key={i}>{row}</tr>)}
      </tbody>
    </table>
  </div>
)

Board.propTypes = {
  spaces: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        imgSrc: PropTypes.string.isRequired,
        nuBombs: PropTypes.number.isRequired,
        hasPlumbus: PropTypes.bool.isRequired,
      }).isRequired
    ).isRequired
  ).isRequired,
  onSpaceClick: PropTypes.func.isRequired,
}

export default Board;
