import { connect} from 'react-redux';
import Board from '../components/Board';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state) => {
  if(state.board.spaces) return { spaces: state.board.spaces }
  return { spaces: Array([]) };
}

export default withRouter(connect(
  mapStateToProps,
  null
)(Board))
