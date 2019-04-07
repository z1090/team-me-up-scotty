import { connect } from "react-redux";
import { togglePaused, resetTimer } from "../../data/actionCreators";

import GameScreen from "./GameScreen";

const mapStateToProps = ({ settings }) => ({
    gamePaused: settings.gamePaused,
    gamePauseText: settings.gamePauseText,
    gameTime: settings.gameTime,
    showCoinToss: settings.showCoinToss,
});

const mapDispatchToProps = (dispatch) => ({
    togglePaused: () => dispatch(togglePaused()),
    resetTimer: () => dispatch(resetTimer()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GameScreen);
