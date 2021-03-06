import { connect} from 'react-redux';
import EndGame from '../components/EndGame';
import { sendScoreToDB } from '../actions/actions'

const mapStateToProps = (state, ownProps) => {
  return { timer: state.timer, boardSize: state.spaces.length };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    submitScore: (name, score, country) => {
      dispatch(sendScoreToDB(name, score, country));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EndGame)
