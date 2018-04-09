import { connect } from 'react-redux';
import Space from '../components/Space';
import { SpaceStates, setSpaceState } from '../actions/actions';

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSpaceClick: id => {
      let spaceStateToSend = ownProps.spaceState;
      if(ownProps.spaceState === SpaceStates.IS_NORMAL){
          spaceStateToSend = SpaceStates.IS_NUMBER;
      }
      else if(ownProps.spaceState === SpaceStates.IS_COVERED_BOMB){
        spaceStateToSend = SpaceStates.IS_BOMB;
        //something to end game
      }
      //handle right clicks for putting plumbuses on and off

      dispatch(setSpaceState(ownProps.id, ownProps.boardSize, spaceStateToSend));
    }
  }
}

export default connect(
  null,
  mapDispatchToProps,
)(Space)
