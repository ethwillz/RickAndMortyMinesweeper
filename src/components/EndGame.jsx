import React from 'react';
import win from '../images/win.gif';
import loss from '../images/loss.gif';
import * as firebase from 'firebase';
import axios from 'axios';
import { CSSTransitionGroup } from 'react-transition-group';
import Leaderboard from './Leaderboard';
import FinalAction from './FinalAction';

export default class EndGame extends React.Component{

  constructor(props){
    super(props);

    this.onClick = this.onClick.bind(this);
    this.updateInput = this.updateInput.bind(this);

    this.state = {
      filterOne: false,
      filterTwo: false,
      scoreClass: '',
    }

    this.img = loss;
    this.didWin = false;
    if(this.props.match.params.res === 'win'){
      this.img = win;
      this.didWin = true;
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

    axios.get('https://ipapi.co/8.8.8.8/json/')
    .then(response => {
      this.country = response.data.country;
    })
    .catch((error) => {
      console.log('Error getting country: ' + error);
    })
  }

  componentDidMount(){
    setTimeout(() =>  this.setState({filterOne: true, scoreClass: 'tada'}) , 2000);
  }

  onClick(){
    this.props.submitScore(this.name, this.props.timer, this.country);
    this.setState({filterTwo: true});
  }

  updateInput(evt){ this.name= evt.target.value; }

  render(){
    let imgClass = 'block';
    let leaderboardClass = 'none';
    let formClass = 'none';
    let promptClass = 'none';
    if(this.state.filterOne && !this.state.filterTwo){
      imgClass = 'animated fadeOut';
      leaderboardClass = 'animated fadeIn';
      /*if(this.didWin) formClass = 'animated fadeIn';
      else promptClass = 'animated fadeIn';*/
      formClass = 'animated fadeOut';
      promptClass = 'animated fadeIn';
    }
    else if(this.state.filterOne && this.state.filterTwo){
      imgClass = 'none';
      leaderboardClass = 'animated fadeIn';
      formClass = 'animated fadeOut';
      promptClass = 'animated fadeIn';
    }

    return (
      <CSSTransitionGroup
        transitionName="comp"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative', }} >
        <img
          className={imgClass}
          style={{
            position: 'absolute',
            width: '100vw',
            height: '100vh', }}
          src={this.img}
          alt='bs' />
        <Leaderboard style={{}} className={leaderboardClass} topScores={this.topScores}/>
        <FinalAction style={{position: 'absolute'}} formClass={formClass} promptClass={promptClass} scoreClass={this.state.scoreClass} />
      </CSSTransitionGroup>
    )
  }
}
