import { connect } from 'react-redux';
import Space from '../components/Space';
import { SpaceStates, setSpaceState, generateBoard } from '../actions/actions';

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSpaceClick: (e, adjacentBombs, id) => {
      if(adjacentBombs === -1){
        dispatch(generateBoard(ownProps.id, ownProps.boardSize)); //special case for first click since you can't lose
      }
      else{
        let spaceStateToSend = ownProps.spaceState;

        if(e.type === 'contextmenu'){
          if(ownProps.spaceState === SpaceStates.IS_COVERED){
             spaceStateToSend = SpaceStates.IS_FLAGGED;
           }
          else if(ownProps.spaceState === SpaceStates.IS_FLAGGED) spaceStateToSend = SpaceStates.IS_COVERED;
        }
        else if(ownProps.spaceState === SpaceStates.IS_COVERED){
          spaceStateToSend = SpaceStates.IS_UNCOVERED;
        }

        dispatch(setSpaceState(ownProps.id, ownProps.boardSize, spaceStateToSend));
      }
    }
  }
}

export default connect(
  null,
  mapDispatchToProps,
)(Space)
