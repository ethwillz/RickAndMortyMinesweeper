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
    setTimeout(() =>  {
      this.setState({scoreClass: 'tada'}) ;
      setTimeout(() => {
        this.setState({filterOne: true});
      }, 1500);
    }, 2000);
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
    let underImage = 'none';
    if(this.state.filterOne && !this.state.filterTwo){
      underImage = 'flex';
      imgClass = 'animated fadeOut';
      leaderboardClass = 'animated fadeIn';
      if(this.didWin) formClass = 'animated fadeIn';
      else promptClass = 'animated fadeIn';
    }
    else if(this.state.filterOne && this.state.filterTwo){
      underImage = 'flex';
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
            width: '100vw',
            height: '100vh',
            display: imgClass === 'block' ? 'block' : 'none'}}
          src={this.img}
          alt='bs' />
        <div style={{display: underImage, width: '80vw' }}>
          <Leaderboard style={{flex: '4'}} className={leaderboardClass} topScores={this.topScores}/>
          <FinalAction
            style={{flex: '1'}}
            formClass={formClass}
            promptClass={promptClass}
            scoreClass={this.state.scoreClass}
            timer={this.props.timer}
            onClick={this.onClick}
            updateInput={this.updateInput} />
        </div>
      </CSSTransitionGroup>
    )
  }
}
