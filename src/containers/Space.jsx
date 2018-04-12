import { connect } from 'react-redux';
import Space from '../components/Space';
import { SpaceStates, setSpaceState, generateBoard } from '../actions/actions';
import { push } from 'react-router-redux'

const mapStateToProps = (state, ownProps) => {
  console.log(state.bombsRemaining);
  return { bombsRemaining: state.bombsRemaining }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSpaceClick: (e, adjacentBombs, id) => {
      if(adjacentBombs === -1){
        dispatch(generateBoard(ownProps.id, ownProps.boardSize)); //special case for first click since you can't lose
      }
      else{

        if(e.type === 'contextmenu'){
          if(ownProps.spaceState === SpaceStates.IS_COVERED){
            if(ownProps.bombsRemaining === 1){ //something not working right with this mechanism
              dispatch(push('/win'));
            }
            dispatch(setSpaceState(ownProps.id, ownProps.boardSize, SpaceStates.IS_FLAGGED));
           }
          else if(ownProps.spaceState === SpaceStates.IS_FLAGGED){
            dispatch(setSpaceState(ownProps.id, ownProps.boardSize, SpaceStates.IS_COVERED));
          }
        }
        else if(ownProps.spaceState === SpaceStates.IS_COVERED && ownProps.hasBomb){
          dispatch(push('/loss'));
        }
        else if(ownProps.spaceState === SpaceStates.IS_COVERED){
          dispatch(setSpaceState(ownProps.id, ownProps.boardSize, SpaceStates.IS_UNCOVERED));
        }
      }
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Space)
