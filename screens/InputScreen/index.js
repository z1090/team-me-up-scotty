import { connect } from "react-redux";

import InputScreen from "./InputScreen";
import {generateTeams} from "../../data/stateActions";


const mapStateToProps = ({ names }) => ({
    names,
});

const mapDispatchToProps = (dispatch) => ({
    onGenerateTeams: data => dispatch(generateTeams(data))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InputScreen);
