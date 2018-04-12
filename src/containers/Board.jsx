import { connect} from 'react-redux';
import Board from '../components/Board';
import { startTimer } from '../actions/actions';

const mapStateToProps = (state) => {
  return { spaces: state.spaces, timer: state.timer }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    startTimer: () => { dispatch(startTimer()) }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board)
