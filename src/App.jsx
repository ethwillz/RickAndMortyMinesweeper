import React, { Component } from 'react';
import portal from './images/portal.png';
import './App.css';

/*
  EASY: 15% bombs 8x8
  MED: 25% bombs 12x12
  HARD: 40% bombs 15x15
  EXTR: 60% bombs 20x20
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
    let imgStyle = {
      width: 70 / size + 'vh',
      height: 70 / size + 'vh',
      cursor: 'pointer'
    }
    let spaces = Array(size).fill(Array(size).fill(false));
    for(let i = 0; i < size; i++){
      for(let j = 0; j < size; j++){
        if(Math.random() < lim) spaces[i][j] = true;
      }
    }
    for(let i = 0; i < size; i++){
      for(let j = 0; j < size; j++){
        spaces[i][j] = <Space
          image={portal}
          hasBomb={spaces[i][j]}
          bombsTouching={this.checkForBombs(spaces, size, i, j)}
          imgStyle={imgStyle}
          h2Style={{display: 'none'}} />
      }
    }
    this.state = {
      spaces
    };

  }

  checkForBombs(spaces, size, i, j){
      let bombsTouching = 0;
      if(i > 0 && spaces[i-1][j]) bombsTouching++;
      else if(i === 0 && spaces[size-1][j]) bombsTouching++;

      if(i > 0 && j < size - 1 && spaces[i-1][j+1]) bombsTouching++;
      if(i === 0 && j === size - 1 && spaces[size-1][0]) bombsTouching++;

      if(j < size - 1 && spaces[i][j+1]) bombsTouching++;
      if(j === size - 1 && spaces[i][0]) bombsTouching++;

      if(i < size - 1 && j < size - 1 && spaces[i+1][j+1]) bombsTouching++;
      if(i === size - 1 && j < size - 1 && spaces[0][0]) bombsTouching++;

      if(i < size - 1 && spaces[i+1][j]) bombsTouching++;
      if(i === size - 1 && spaces[0][j]) bombsTouching++;

      if(i < size - 1 && j > 0 && spaces[i+1][j-1]) bombsTouching++;
      if(i === size - 1 && j === 0 && spaces[0][size-1]) bombsTouching++;

      if(j > 0 && spaces[i][j-1]) bombsTouching++;
      if(j === 0 && spaces[i][size - 1]) bombsTouching++;

      if(i > 0 && j > 0 && spaces[i-1][j-1]) bombsTouching++;
      if(i === 0 && j === 0 && spaces[size-1][size-1]) bombsTouching++;
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
      image: props.image,
      onClick: props.onClick,
      bombs: props.bombs,
      imgStyle: props.imgStyle,
      h2Style: props.h2Style,
      bombsTouching: 0,
      updateBombs: function(numBombs){
        this.setState({bombsTouching: numBombs})
      }
    }
  }

  onClick(){
    this.state.setState({imgStyle: {display: 'none'}, h2Style: {display: 'block'}}, this.update);
  }

  render(){
    return (
      <div className='Space'>
        <img src={this.state.image} alt='bs' onClick={this.onClick} style={this.state.imgStyle}></img>
        <h2 style={{display: 'none'}}>{this.state.bombsTouching}</h2>
      </div>
    )
  }
}

export default App;
