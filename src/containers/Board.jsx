import { connect } from 'react-redux';
import GameBoard from './Board_p';
import { setSpaceState } from './actions/actions';

const mapStateToProps = (state, ownProps) => {
  return state.spaces;
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSpaceClick: id => {
      dispatch(setSpaceState(id))
    }
  }
}

const Board = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameBoard)

export default Board;
