import { connect} from 'react-redux';
import EndGame from '../components/EndGame';

const mapStateToProps = (state) => {
  return { timer: state.timer }
}

export default connect(
  mapStateToProps,
  null
)(EndGame)
