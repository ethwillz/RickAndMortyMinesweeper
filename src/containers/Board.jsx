import { connect} from 'react-redux';
import Board from '../components/Board';

const mapStateToProps = (state) => {
  return { spaces: state.spaces }
}

export default connect(
  mapStateToProps,
  null
)(Board)
