import React from 'react';
import PropTypes from 'prop-types';
import Ad from './Ad';

export default class Board extends React.Component{

  constructor(props){
    super(props);
    this.formatTime = this.formatTime.bind(this);
  }

  componentDidMount(){
    this.props.startTimer();
  }

  componentWillUnmount(){
    this.props.stopTimer();
  }

  formatTime(secs){
    let hrs = parseInt(secs / 60 / 60, 10);
    let mins = parseInt(secs / 60, 10);
    if(mins < 10) mins = '0' + mins;
    secs = secs % 60;
    if(secs < 10) secs = '0' + secs;
    if(hrs > 0){
      if(hrs < 10) mins = '0' + hrs;
      return hrs + ':' + mins + ':' + secs;
    }
    return mins + ':' + secs;
  }

  render(){
    return (
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <Ad />
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <h2
            style={{
              textAlign: 'center',
              fontSize: '3em',
              marginTop: '0px',
            }} >
            {this.formatTime(this.props.timer)}
          </h2>
          <table>
            <tbody>
              {this.props.spaces.map((row, i) => <tr key={i}>{row}</tr>)}
            </tbody>
          </table>
        </div>
        <Ad />
      </div>
    )
  }
}

Board.propTypes = {
  spaces: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape().isRequired
    ).isRequired
  ).isRequired,
}
