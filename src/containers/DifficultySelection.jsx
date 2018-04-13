import DifficultySelection from '../components/DifficultySelection';
import { setBoardSize } from '../actions/actions';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  onDifficultyClick: (difficulty) => {
      let boardSize = 8;
      if(difficulty === "Testing")  boardSize = 2;
      if(difficulty === "Medium")  boardSize = 12;
      if(difficulty === "Hard") boardSize = 15;
      if(difficulty === "Extreme") boardSize = 20;

      dispatch(setBoardSize(boardSize));
      dispatch(push('/play'));
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(DifficultySelection)
