import { connect} from 'react-redux';
import EndGame from '../components/EndGame';
import { sendScoreToDB } from '../actions/actions'

const mapStateToProps = (state, ownProps) => {
  return { timer: state.timer }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    submitScore: () => {
      dispatch(sendScoreToDB);
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EndGame)
