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

  onClick(e){
    e.preventDefault();
    this.props.onSpaceClick(e, this.props.adjacentBombs, this.props.id);
  }

  render(){
    let props = this.props;
    let spaceDimension = 70 / props.boardSize + 'vh';
    let numDimension = 60 / props.boardSize + 'vh';

    let isCovered = props.spaceState === SpaceStates.IS_COVERED ? 'block' : 'none';
    let isBomb = props.spaceState === SpaceStates.IS_UNCOVERED && props.hasBomb ? 'block' : 'none';
    let isNumber = props.spaceState === SpaceStates.IS_UNCOVERED && props.adjacentBombs > 0 ? 'block' : 'none';
    let isFlagged = props.spaceState === SpaceStates.IS_FLAGGED ? 'flex' : 'none';

    let imgStyle = {
      width: spaceDimension,
      height: spaceDimension,
      cursor: 'pointer',
    }

    let divStyle = {
      height: spaceDimension,
      width: spaceDimension,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }

    return (
      <td
        onClick={this.onClick}
        onContextMenu={this.onClick}
        style={{...divStyle}} >
        <div style={{...divStyle, display: isCovered}} >
          <img
            src = {portal}
            alt = 'bs'
            style = {imgStyle} />
        </div>
        <div style={{...divStyle, display: isFlagged, position: 'relative'}} >
          <img
            src = {portal}
            alt = 'bs'
            style = {{...imgStyle, position: 'absolute'}} />
          <img
            src = {plumbus}
            alt = 'bs'
            style = {{...imgStyle, position: 'absolute'}} />
        </div>
        <div style={{
            display: isNumber,
          }} >
          <h2 style={{margin: 0, textAlign: 'center', fontSize: numDimension}} >
            {props.adjacentBombs}
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
  adjacentBombs: PropTypes.number.isRequired,
  hasBomb: PropTypes.bool.isRequired,
  boardSize: PropTypes.number.isRequired,
  spaceState: PropTypes.string.isRequired,
  onSpaceClick: PropTypes.func.isRequired,
};
