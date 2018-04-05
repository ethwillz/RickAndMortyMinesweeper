import React, { Component } from 'react';
import _ from 'lodash'
import portal from './images/portal.png';
import plumbus from './images/plumbus.png';
import pickleRick from './images/picklerick.png';
import './App.css';

/*
  EASY: 15% 8x8
  MEDI: 25% 12x12
  HARD: 40% 15x15
  EXTR: 60% 20x20
*/

class App extends Component {
  render() {
    return (
      <Board size={8} style={{'max-width': '100%'}}/>
    );
  }
}

class Board extends App {
  constructor(props){
    super(props);
    let size = this.props.size;
    let lim;
    switch(size){
      case 8:
        lim = .16;
        break
      case 12:
        lim = .26;
        break;
      case 15:
        lim = .41;
        break;
      default:
        lim = .61;
        break;
    }
    let portalStyle = {
      width: 70 / size + 'vh',
      height: 70 / size + 'vh',
      cursor: 'pointer',
      position: 'absolute',
    }
    const spaceStyle = {
      height: 70 / size + 'vh',
      width: 70 / size + 'vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    }
    let bombSpaces = Array(size).fill(0).map(row => new Array(size).fill(false));
    for(let i = 0; i < size; i++){
      for(let j = 0; j < size; j++){
        if(Math.random() < lim) bombSpaces[i][j] = true;
      }
    }

    let spaces = Array(size).fill(0).map(row => new Array(size).fill(false));
    for(let i = 0; i < size; i++){
      for(let j = 0; j < size; j++){
        let bombsAround = this.checkForBombs(bombSpaces, size, i, j);
          spaces[i][j] = <Space
            id = {i * size + j}
            img = {portal}
            hasBomb = {bombSpaces[i][j]}
            bombsTouching = {bombsAround}
            spaceStyle = {spaceStyle}
            portalStyle = {portalStyle}
            h2Style = {{display: 'none'}}
            propogateZeros = {this.propogateZeros.bind(this)}/>;
      }
    }

    this.state = {
      spaces,
      size,
      spaceStyle
    };
  }

  checkForBombs(spaces, size, i, j){
      let bombsTouching = 0;

      if(i > 0 && spaces[i-1][j]) bombsTouching++;
      if(i > 0 && j < size - 1 && spaces[i-1][j+1]) bombsTouching++;
      if(j < size - 1 && spaces[i][j+1]) bombsTouching++;
      if(i < size - 1 && j < size - 1 && spaces[i+1][j+1]) bombsTouching++;
      if(i < size - 1 && spaces[i+1][j]) bombsTouching++;
      if(i < size - 1 && j > 0 && spaces[i+1][j-1]) bombsTouching++;
      if(j > 0 && spaces[i][j-1]) bombsTouching++;
      if(i > 0 && j > 0 && spaces[i-1][j-1]) bombsTouching++;

      return bombsTouching;
  }

  propogateZeros(spaceId){
    let spaces = this.state.spaces.map((item, i) => {
      return item.map((space, j) => Object.assign({}, space));
    });
    console.log(spaces);
    console.log(this.state.spaces);
    let startRow = parseInt(spaceId / this.state.size);
    let startColumn = spaceId % this.state.size;
    for(let i = startRow + 1; i < this.state.size; i++){
      if(spaces[i][startColumn].props.bombsTouching === 0){
        spaces[i][startColumn] = <Space
          id = {spaces[i][startColumn].props.id}
          img = {spaces[i][startColumn].props.img}
          hasBomb = {spaces[i][startColumn].props.hasBomb}
          bombsTouching = {spaces[i][startColumn].props.bombsTouching}
          spaceStyle = {spaces[i][startColumn].props.portalStyle}
          portalStyle = {{display: 'none'}}
          h2Style = {{display: 'hidden'}}
          propogateZeros = {spaces[i][startColumn].props.propogateZeros}/>;
      }
      //else{ break; }
    }

    this.setState({
      spaces: [spaces]
    });
  }

  render () {
    let rows = this.state.spaces.map(function(item, i){
      let row = item.map(function(space, j){
        return( <td key={j}>{space}</td> );
      });
      return ( <tr key={i}>{row}</tr> )
    });

    return (
      <div className='Board'>
        <table>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
}

class Space extends Component {
  constructor(props){
    super(props);
    this.onClick = this.onClick.bind(this);

    this.state = {
      id: props.id,
      img: props.img,
      onClick: props.onClick,
      hasBomb: props.hasBomb,
      spaceStyle: props.spaceStyle,
      portalStyle: props.portalStyle,
      h2Style: props.h2Style,
      bombsTouching: props.bombsTouching,
      propogateZeros: props.propogateZeros,
    }
  }

  onClick(){
    if(this.state.hasBomb){
      this.setState({
        img: pickleRick,
        h2Style: {display: 'none'},
      });

      //animate losing
    }

    if(this.state.bombsTouching === 0){
      this.setState({
        portalStyle: {display: 'none'},
        h2Style: {display: 'none'},
      }, () => this.props.propogateZeros(this.state.id));

      //check for win
    }

    if(!this.state.hasBomb && this.state.bombsTouching !== 0){
      this.setState({
        portalStyle: {display: 'none'},
        h2Style: {display: 'block'},
      });

      //check for win
    }
  }

  render(){
    return (
      <div className='Space' style={this.state.spaceStyle}>
        <img
          src={this.state.img}
          alt='bs'
          onClick={this.onClick}
          style={this.state.portalStyle}>
        </img>
        <h2 style={this.state.h2Style}>
          {this.state.bombsTouching}
        </h2>
      </div>
    )
  }
}

export default App;
