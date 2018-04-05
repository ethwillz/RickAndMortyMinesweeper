import React, { Component } from 'react';
import portal from './images/portal.png';
import plumbus from './images/plumbus.png';
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
    let spaceStyle = {
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
          img = {portal}
          hasBomb = {bombSpaces[i][j]}
          bombsTouching = {bombsAround}
          spaceStyle = {spaceStyle}
          portalStyle = {portalStyle}
          h2Style = {{display: 'none'}}/>;
      }
    }

    this.state = {
      spaces
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
    this.state = {
      img: props.img,
      onClick: props.onClick,
      hasBomb: props.hasBomb,
      spaceStyle: props.spaceStyle,
      portalStyle: props.portalStyle,
      h2Style: props.h2Style,
      bombsTouching: props.bombsTouching,
      updateBombs: function(numBombs){
        this.setState({bombsTouching: numBombs})
      }
    }

    this.onClick = this.onClick.bind(this);
  }

  onClick(){
    console.log(this.state.hasBomb);
    if(this.state.hasBomb){
      console.log("hello");
      this.setState({
        img: plumbus,
        //h2Style: {display: 'none'},
      });
    }

    if(this.state.bombsTouching === 0){
      this.setState({
        portalStyle: {display: 'none'},
        //h2Style: {display: 'none'},
      });
    }

    if(!this.state.hasBomb && this.state.bombsTouching !== 0){
      this.setState({
        portalStyle: {display: 'none'},
        h2Style: {display: 'block'},
      });
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
        <h2 style={{display: 'hidden', positon: 'absolute'}}>
          {this.state.bombsTouching}
        </h2>
      </div>
    )
  }
}

export default App;
