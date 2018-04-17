import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default class FinalAction extends React.Component{
  render(){
    const StyledLink = styled(Link)`
        text-decoration: none;

        &:focus, &:hover, &:visited, &:link, &:active {
            text-decoration: none;
        }
    `;

    return (
      <div style={{position: 'relative', textAlign: 'center'}}>
        <div
          className={this.props.formClass}
          style={{position: 'absolute', }} >
          <h2
            className={this.props.scoreClass}
            style={{
              fontSize: '10vh',
              textAlign: 'center',
              marginTop: '0',
              marginBottom: '2vh'}}>
              {this.props.timer}
          </h2>
          <div style={{display: 'flex'}}>
            <h2 style={{
                fontSize: '4vh',
                marginRight: '2vw', }} >
                Name:
            </h2>
            <input className={'submitScoreInput'} onChange={this.props.updateInput} />
          </div>
          <button className={'submitScoreButton'} onClick={this.props.onClick}>Submit Score</button>
        </div>
        <h2
          className={this.props.promptClass}
          style={{
            position: 'absolute',
            fontSize: '7vh',
            width: '10vh', }} >
          <StyledLink to='/'>Play again</StyledLink>
        </h2>
      </div>
    )
  }
}
