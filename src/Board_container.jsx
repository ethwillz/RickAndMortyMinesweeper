import { connect } from 'react-redux';
import Board from './Board_presentation';
import { spaceClick } from './actions';

const mapStateToProps = state => {
  return state.spaces;
}

const mapDispatchToProps = dispatch => {
  return {
    onSpaceClick: id => {
      dispatch(spaceClick(id))
    }
  }
}

const BoardSpaces = connect(
  mapStateToProps,
  mapDispatchToProps
)(Board)
