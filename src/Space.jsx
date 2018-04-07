import React from 'react';
import PropTypes from 'prop-types';
import plumbus from './images/plumbus.png';

const Space = ({imgSrc, numBombs, hasPlumbus}) => (
  <td>
    if(hasPlumbus){
      <img
        src = {plumbus}
        alt = 'bs' />
    }
    <img
      src = {imgSrc}
      alt = 'bs' />
    <h2
       >
       {numBombs}
    </h2>
  </td>
)

Space.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  numBombs: PropTypes.number.isRequired,
  hasPlumbus: PropTypes.bool.isRequired,
};

export default Space;
