import { connect } from 'react-redux';
import Space from '../components/Space';
import { SpaceStates, setSpaceState, generateBoard, checkIfWon } from '../actions/actions';
import { push } from 'react-router-redux';

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSpaceClick: (e, adjacentBombs, id) => {
      if(adjacentBombs === -1){
        dispatch(generateBoard(ownProps.id, ownProps.boardSize)); //special case for first click since you can't lose
      }
      else{

        if(e.type === 'contextmenu'){
          console.log(ownProps);
          if(ownProps.spaceState === SpaceStates.IS_COVERED){
            dispatch(setSpaceState(ownProps.id, ownProps.boardSize, SpaceStates.IS_FLAGGED));
            dispatch(checkIfWon());
           }
          else if(ownProps.spaceState === SpaceStates.IS_FLAGGED){
            dispatch(setSpaceState(ownProps.id, ownProps.boardSize, SpaceStates.IS_COVERED));
          }
        }
        else if(ownProps.spaceState === SpaceStates.IS_COVERED && ownProps.hasBomb){
          dispatch(push('EndGame/loss'));
        }
        else if(ownProps.spaceState === SpaceStates.IS_COVERED){
          dispatch(setSpaceState(ownProps.id, ownProps.boardSize, SpaceStates.IS_UNCOVERED));
        }
      }
    }
  }
}

export default connect(
  null,
  mapDispatchToProps,
)(Space)
