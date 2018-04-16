import React from 'react';
import { Link } from 'react-router-dom';
import win from '../images/win.gif';
import loss from '../images/loss.gif';
import styled from 'styled-components';
import * as firebase from 'firebase';
import axios from 'axios';
import { CSSTransitionGroup } from 'react-transition-group';
import Leaderboard from './Leaderboard';

export default class EndGame extends React.Component{

  constructor(props){
    super(props);

    this.onClick = this.onClick.bind(this);
    this.updateInput = this.updateInput.bind(this);

    this.state = {
      filterOne: false,
      filterTwo: false,
    }

    this.img = loss;
    if(this.props.match.params.res === 'win'){
      this.img = win;
    }

    this.topScores = [{name: 'NAME', score: 'SCORE', country: 'COUNTRY'}];
    firebase.firestore().collection('scores').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        this.topScores.push({
          name: data.name,
          score: data.score,
          country: data.country,
        });
      });
    });

    axios.get('https://api.ipstack.com/129.186.248.1?access_key=cc1cba0327d9a91277e3a5ddba1bc7ce')
    .then(response => {
      this.country = response.data.country_code;
    })
    .catch((error) => {
      console.log('Error getting country: ' + error);
    })
  }

  componentDidMount(){
    setTimeout(() =>  this.setState({filterOne: true}) , 2000);
  }

  onClick(){
    this.props.submitScore(this.name, this.props.timer, this.country);
    this.setState({filterTwo: true});
  }

  updateInput(evt){ this.name= evt.target.value; }

  render(){
    const StyledLink = styled(Link)`
        text-decoration: none;

        &:focus, &:hover, &:visited, &:link, &:active {
            text-decoration: none;
        }
    `;

    let imgDisplayed = 'block';
    let leaderboardDisplayed = 'none';
    let formDisplayed = 'none';
    let promptDisplayed = 'none';
    if(this.state.filterOne && !this.state.filterTwo){
      imgDisplayed = 'none';
      leaderboardDisplayed = 'block';
      if(this.didWin) this.formDisplayed = 'block';
      else promptDisplayed = 'block';
    }
    else if(this.state.filterOne && this.state.filterTwo){
      imgDisplayed = 'none';
      leaderboardDisplayed = 'block';
      promptDisplayed = 'block';
    }

    return (
      <CSSTransitionGroup
          transitionName="comp"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500} >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative' }} >
          <img
            style={{
              position: 'absolute',
              width: '100vw',
              height: '100vh',
              display: imgDisplayed }}
            src={this.img}
            alt='bs' />
          <Leaderboard style={{display: leaderboardDisplayed}} topScores={this.topScores}/>
          <div
            style={{
              marginLeft: '5vw',
              display: formDisplayed,
              marginBottom: '4vh',
              flexDirection: 'column'}} >
            <h2 style={{
                fontSize: '10vh',
                textAlign: 'center',
                marginTop: '0',
                marginBottom: '2vh'}}>
                {this.props.timer}
            </h2>
            <div style={{display: 'flex'}}>
              <h2 style={{
                  marginRight: '2vw',
                  fontSize: '4vh'}} >
                  Name:
              </h2>
              <input className={'submitScoreInput'} onChange={this.updateInput} />
            </div>
            <button className={'submitScoreButton'} onClick={this.onClick}>Submit Score</button>
          </div>
          <h2
            style={{
              fontSize: '5vw',
              margin: '0',
              display: promptDisplayed}} >
            <StyledLink to='/'>Play again?</StyledLink>
          </h2>
        </div>
    </CSSTransitionGroup>
    )
  }
}
