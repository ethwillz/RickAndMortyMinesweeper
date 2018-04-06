import React, { Component } from 'react';
import portal from './images/portal.png';
import plumbus from './images/plumbus.png';
import pickleRick from './images/picklerick.png';

function Space(props){
  let plumbusEl = null;
  if(props.plumbus){
    plumbusEl = <img
      src = {plumbus}
      alt = 'bs'
      style = {{
        width: 70 / props.boardSize + 'vh',
        height: 70 / props.boardSize + 'vh',
        cursor: 'pointer',
        position: 'absolute'
      }} />
  }
  return (
    <td className='Space'>
      <div style={{
        height: 70 / props.boardSize + 'vh',
        width: 70 / props.boardSize  + 'vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }} >
        {plumbusEl}
        <img
          src = {props.imgSrc}
          alt = 'bs'
          style = {props.imgStyle}>
        </img>
        <h2 style={props.h2Style}>
          {props.bombsTouching}
        </h2>
      </div>
    </td>
  )
}

class PortalSpace extends Component{
  constructor(props){
    super(props);
    this.state = {
      id: props.id
    }
    this.onClick = this.onClick.bind(this);
  }

  onClick(){ this.props.onSpaceClick(this.props.id); }

  render(){
    return (
      <Space
        imgSrc = {portal}
        imgStyle = {{
          width: 70 / this.props.boardSize + 'vh',
          height: 70 / this.props.boardSize + 'vh',
          cursor: 'pointer',
          position: 'absolute'
        }}
        h2Style = {{ display: 'none' }}
        bombsTouching = {this.props.bombsTouching}
        plumbus = {this.props.plumbus}
        boardSize = {this.props.boardSize}
        onClick = {this.onClick} />
    );
  }

}

class BombSpace extends Component{
  constructor(props){
    super(props);
    this.state = {
      id: props.id
    }
    this.onClick = this.onClick.bind(this);
  }

  onClick(){ this.props.onSpaceClick(this.props.id); }

  render(){
    return (
      <Space
        imgSrc = {pickleRick}
        imgStyle = {{
          width: 70 / this.props.boardSize + 'vh',
          height: 70 / this.props.boardSize + 'vh',
          cursor: 'pointer',
          position: 'absolute'
        }}
        h2Style = {{ display: 'none' }}
        bombsTouching = {this.props.bombsTouching}
        plumbus = {this.props.plumbus}
        onClick = {this.onClick} />
    );
  }
}

export {PortalSpace, BombSpace};
