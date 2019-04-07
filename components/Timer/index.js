import { connect } from "react-redux";

import Timer from "./Timer";

const mapStateToProps = ({ settings }) => ({
    gameTime: settings.gameTime,
    gamePaused: settings.gamePaused,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Timer);
