import { connect } from 'react-redux';
import BoardSpace from '../components/Space';
import { setSpaceState } from '../actions/actions';

const mapStateToProps = (state, ownProps) => {
  return state; 
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: id => {
      dispatch(setSpaceState(id, ownProps.spaceState))
    }
  }
}

const Space = connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardSpace)

export default Space;
