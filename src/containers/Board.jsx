import { connect} from 'react-redux';
import Board from '../components/Board';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state) => {
  if(state.spaces) return { spaces: state.spaces }
  return { spaces: Array([]) };
}

export default connect(
  mapStateToProps,
  null
)(withRouter(Board))
