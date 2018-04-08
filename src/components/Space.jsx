import React from 'react';
import PropTypes from 'prop-types';
import plumbus from '../images/plumbus.png';
import portal from '../images/portal.png';
import picklerick from '../images/picklerick.png'
import SpaceStyles from '../actions/actions'

export default class Space extends React.Component{
  render(){
    let props = this.props;

    let isNormal = 'none', isBomb = 'none', isNumber = 'none', isFlagged = 'none';
    if(props.spaceStyle === SpaceStyles.IS_NORMAL) isNormal = 'block';
    if(props.spaceStyle === SpaceStyles.IS_BOMB) isBomb = 'block';
    if(props.spaceStyle === SpaceStyles.IS_NUMBER && props.numBombs !== 0) isNumber = 'block';
    if(props.spaceStyle === SpaceStyles.IS_FLAGGED) isFlagged = 'block';

    let imgStyle = {
      width: props.boardDimension,
      height: props.boardDimension,
      cursor: 'pointer',
      position: 'absolute'
    }

    let divStyle = {
      height: props.boardDimension,
      width: props.boardDimension,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    }

    return (
      <td>
        <div
          style={divStyle && {display: isNormal}}
          onClick = {props.onClick} >
          <img
            src = {portal}
            alt = 'bs'
            style = {imgStyle} />
        </div>
        <div
          style={divStyle && {display: isFlagged}}
          onClick = {props.onClick} >
          <img
            src = {plumbus}
            alt = 'bs'
            style = {imgStyle} />
          <img
            src = {portal}
            alt = 'bs'
            style = {imgStyle} />
        </div>
        <div
          style={divStyle && {display: isNumber}}
          onClick = {props.onClick} >
          <h2
            style = {{position: 'absolute'}} >
            {props.numBombs}
          </h2>
        </div>
        <div
          style={divStyle && {display: isBomb}}
          onClick = {props.onClick} >
          <img
            src = {picklerick}
            alt = 'bs'
            style = {imgStyle} />
        </div>
      </td>
    )
  }
}

Space.propTypes = {
  numBombs: PropTypes.number.isRequired,
  boardDimension: PropTypes.string.isRequired,
  spaceState: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
