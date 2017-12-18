import React, { Component } from 'react';
import portal from './images/portal.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <Board size={10} />
    );
  }
}

class Board extends App {
  constructor(props){
    super(props);
    let size = this.props.size;
    this.state = {
      spaces: Array(size).fill(Array(size).fill(portal)),
    }
  }

  renderSpace (i, j) {
    return ( <Space image={this.state.spaces[i][j]} onClick={this.handleClick}/> );
  }

  handleClick(){
    alert('hello');
  }

  render () {
    let self = this;
    let rows = this.state.spaces.map(function(item, i){
      let space = item.map(function(space, j){
        return( <td key={j}>{self.renderSpace(i, j)}</td> );
      });
      return ( <tr key={i}>{space}</tr> )
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
  render(){
    return (
      <img src={this.props.image} alt='bs' onClick={this.props.onClick}></img>
    )
  }
}

export default App;
