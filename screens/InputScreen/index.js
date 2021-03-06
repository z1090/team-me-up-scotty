import { connect } from "react-redux";

import InputScreen from "./InputScreen";
import { generateTeams, resetInputs } from "../../data/actionCreators";

const mapStateToProps = ({ names, settings }) => ({
    names,
    settings,
});

const mapDispatchToProps = (dispatch) => ({
    onGenerateTeams: (data) => dispatch(generateTeams(data)),
    onResetInputs: () => dispatch(resetInputs()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InputScreen);
