import React from 'react';
import PropTypes from 'prop-types';
import plumbus from '../images/plumbus.png';
import portal from '../images/portal.png';
import picklerick from '../images/picklerick.png'
import { SpaceStates } from '../actions/actions'

export default class Space extends React.Component{

  constructor(props){
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(){ this.props.onSpaceClick(); }

  render(){
    let props = this.props;

    let isNormal = 'none'
    let isBomb = 'none'
    let isNumber = 'none'
    let isFlagged = 'none';
    if(props.spaceState === SpaceStates.IS_NORMAL
      || props.spaceState === SpaceStates.IS_COVERED_BOMB) isNormal = 'block';
    if(props.spaceState === SpaceStates.IS_BOMB) isBomb = 'block';
    if(props.spaceState === SpaceStates.IS_NUMBER && props.numBombs !== 0) isNumber = 'flex';
    if(props.spaceState === SpaceStates.IS_FLAGGED) isFlagged = 'block';

    let imgStyle = {
      width: 70 / props.boardSize + 'vh',
      height: 70 / props.boardSize + 'vh',
      cursor: 'pointer',
    }

    let divStyle = {
      height: 70 / props.boardSize + 'vh',
      width: 70 / props.boardSize + 'vh',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }

    return (
      <td
        onClick={this.onClick}
        style={{...divStyle}} >
        <div style={{...divStyle, display: isNormal}} >
          <img
            src = {portal}
            alt = 'bs'
            style = {imgStyle} />
        </div>
        <div style={{...divStyle, display: isFlagged, position: 'relative'}} >
          <img
            src = {plumbus}
            alt = 'bs'
            style = {{...imgStyle, position: 'absolute'}} />
          <img
            src = {portal}
            alt = 'bs'
            style = {{...imgStyle, position: 'absolute'}} />
        </div>
        <div style={{
            ...divStyle,
            display: isNumber,
            color: '#4badc8',
            textShadow: '-1px 0 #7df24b, 0 1px #7df24b, 1px 0 #7df24b, 0 -1px #7df24b',
            paddingBottom: 0,
            fontSize: '180%',
          }} >
          <h2 style={{margin: 0, textAlign: 'center'}} >
            {props.numBombs}
          </h2>
        </div>
        <div style={{...divStyle, display: isBomb}} >
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
  boardSize: PropTypes.number.isRequired,
  spaceState: PropTypes.string.isRequired,
  onSpaceClick: PropTypes.func.isRequired,
};
