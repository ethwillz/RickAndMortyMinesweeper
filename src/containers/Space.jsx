import { connect } from 'react-redux';
import Space from '../components/Space';
import { SpaceStates, setSpaceState } from '../actions/actions';
import { withRouter } from 'react-router-dom';

function loss(){
  alert("You lose");
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSpaceClick: (e, id) => {
      let spaceStateToSend = ownProps.spaceState;
      if(e.type === 'contextmenu'){
        if(ownProps.spaceState === SpaceStates.IS_COVERED) spaceStateToSend = SpaceStates.IS_FLAGGED;
        else if(ownProps.spaceState === SpaceStates.IS_FLAGGED) spaceStateToSend = SpaceStates.IS_COVERED;
      }
      else if(ownProps.spaceState === SpaceStates.IS_COVERED){
        spaceStateToSend = SpaceStates.IS_UNCOVERED;
        if(ownProps.hasBomb) setTimeout(loss, 250);
      }

      dispatch(setSpaceState(ownProps.id, ownProps.boardSize, spaceStateToSend));
    }
  }
}

export default withRouter(connect(
  null,
  mapDispatchToProps,
)(Space))
