import React from 'react';

export default class LeaderBoard extends React.Component{
  render(){
    let trStyle = {display: 'flex', width: '50vw', textAlign: 'center', marginBottom: '3vh'};
    let tdStyle = {
      fontSize: '3vw',
      flex: '1',
      color: '#4badc8',
      textShadow: '-1px 0 #7df24b, 0 1px #7df24b, 1px 0 #7df24b, 0 -1px #7df24b'
    };

    return (
      <table>
        <tbody>
          {this.props.topScores
            .sort((a,b) => a.score - b.score)
            .slice(0, 11)
            .map((scoreInfo, i) => {
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
          })
        }
        </tbody>
      </table>
    )
  }
}
