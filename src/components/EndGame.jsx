import React from 'react';
import { Link } from 'react-router-dom';
import win from '../images/win.gif';
import loss from '../images/loss.gif';
import styled from 'styled-components';
import * as firebase from 'firebase';
import axios from 'axios';

export default class EndGame extends React.Component{

  constructor(props){
    super(props);
    this.onClick = this.onClick.bind(this);
    this.updateInput = this.updateInput.bind(this);

    this.state = Object.assign({}, this.state, {imgFaded: false})

    this.img = loss;
    this.didWin = 'none';
    if(this.props.match.params.res === 'win'){
      this.img = win;
      this.didWin = 'flex';
    }

    this.topScoresInfo = [{name: 'NAME', score: 'SCORE', country: 'COUNTRY'}];
    firebase.firestore().collection('scores').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        this.topScoresInfo.push({
          name: data.name,
          score: data.score,
          country: data.country,
        });
      });
    });

    axios.get('http://api.ipstack.com/129.186.248.1?access_key=cc1cba0327d9a91277e3a5ddba1bc7ce')
    .then(response => {
      this.country = response.data.country_code;
    })
    .catch((error) => {
      console.log('Error getting country: ' + error);
    })
  }

  componentDidMount(){
    setTimeout(() => {
      this.setState( {imgFaded: true} );
    }, 2500);
  }

  onClick(){
    this.props.submitScore(this.props.timer, this.name, this.country)
  }

  updateInput(evt){
    this.name= evt.target.value;
  }

  render(){
    const StyledLink = styled(Link)`
        text-decoration: none;

        &:focus, &:hover, &:visited, &:link, &:active {
            text-decoration: none;
        }
    `;

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }} >
        <img
          className={this.state.imgFaded ? 'fadeOut' : ''}
          style={{position: 'absolute', width: '100vw', height: '100vh'}}
          src={this.img}
          alt='bs' />
        <table style={{visibility: 'hidden', marginBottom: '8vh'}} className={this.state.imgFaded ? 'fadeIn' : ''}>
          <tbody>
            {this.topScoresInfo.map((scoreInfo, i) => {
              let trStyle = {display: 'flex', width: '50vw', textAlign: 'center', marginBottom: '3vh'};
              let tdStyle = {
                fontSize: '3vw',
                flex: '1',
                color: '#4badc8',
                textShadow: '-1px 0 #7df24b, 0 1px #7df24b, 1px 0 #7df24b, 0 -1px #7df24b'
              };
              if(i === 0){
                tdStyle.fontSize = '4vw'
                tdStyle.color = '#7df24b';
                tdStyle.textShadow = '-1px 0 #4badc8, 0 1px #4badc8, 1px 0 #4badc8, 0 -1px #4badc8';
              }
              return (
                <tr key={i} style={trStyle}>
                  <td style={tdStyle}>{scoreInfo.name}</td>
                  <td style={tdStyle}>{scoreInfo.score}</td>
                  <td style={tdStyle}>{scoreInfo.country}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div style={{display: this.didWin}}>
          <h2>{this.props.timer}</h2>
          <input onChange={this.updateInput} placeholder='Name'></input>
          <button onClick={this.onClick}>Submit Score</button>
        </div>
        <h2
          className={this.state.imgFaded ? 'fadeIn' : ''}
          style={{
            fontSize: '5vw',
            margin: '0',
            visibility: 'hidden'
          }} >
          <StyledLink to='/'>Play again?</StyledLink>
        </h2>
      </div>
    )
  }
}
