import { connect} from 'react-redux';
import Board from '../components/Board';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state) => {
  console.log(state);
  if(state.spaces) return { spaces: state.spaces }
  return { spaces: Array([]) };
}

export default withRouter(connect(
  mapStateToProps,
  null
))(Board)
