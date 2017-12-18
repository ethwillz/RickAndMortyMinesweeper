import React, { Component } from 'react';
import portal from './images/portal.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <Board size={10} numBombs={2} />
    );
  }
}

class Board extends App {
  constructor(props){
    super(props);
    let size = this.props.size;
    this.state = {
      spaces: Array(size)
        .fill(Array(size)
        .fill(
          <Space image={portal} onClick={this.handleClick} hasBomb={this.hasBomb()} bombsTouching={0}/>
        ))
    };
  }

  hasBomb(numBombs){
    //TODO randomly determine if space should have a bomb
  }

  handleClick(){
    //TODO handle click on board space
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
    this.state ={
      image: props.image,
      onClick: props.onClick,
      bombs: props.bombs
    }
  }

  render(){
    return (
      <div className='Space'>
        <img src={this.state.image} alt='bs' onClick={this.state.onClick}></img>
        <h2>{this.state.bombsTouching}</h2>
      </div>
    )
  }
}

export default App;
