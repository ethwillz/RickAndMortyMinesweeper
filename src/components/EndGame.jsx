import React from 'react';
import { Link } from 'react-router-dom';
import win from '../images/win.gif';
import loss from '../images/loss.gif';
import styled from 'styled-components';

export default class EndGame extends React.Component{
  render(){
    const StyledLink = styled(Link)`
        text-decoration: none;

        &:focus, &:hover, &:visited, &:link, &:active {
            text-decoration: none;
        }
    `;

    if(this.props.match.params.res === 'win'){
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }} >
          <img style={{position: 'absolute', width: '100vw', height: '100vh'}} src={win} alt='bs' />
          <h2 style={{position: 'absolute', fontSize: '10vw', margin: '0'}}>
            <StyledLink to='/'>Play again?</StyledLink>
          </h2>
        </div>
      )
    }

    return (
      <div style={{position: 'relative'}} >
        <h2 style={{position: 'absolute'}}><Link to='/'>Play again?</Link></h2>
        <img style={{position: 'absolute'}} src={loss} alt='bs' />
      </div>
    )
  }
}
