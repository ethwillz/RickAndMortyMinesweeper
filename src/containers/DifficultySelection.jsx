import DifficultySelection from '../components/DifficultySelection';
import { setBoardSize } from '../actions/actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  onDifficultyClick: (difficulty) => {
      console.log(difficulty);
      let boardSize = 8;
      if(difficulty === "Medium")  boardSize = 12;
      if(difficulty === "Hard") boardSize = 15;
      if(difficulty === "Extreme") boardSize = 20;

      dispatch(setBoardSize(boardSize));
    }
  }
}

export default withRouter(connect(
  null,
  mapDispatchToProps
))(DifficultySelection)
