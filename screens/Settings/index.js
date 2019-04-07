import { connect } from "react-redux";
import Settings from "./Settings";
import { submitSettings, regenerateTeams } from "../../data/actionCreators";

const mapStateToProps = ({ settings }) => ({
    settings,
});

const mapDispatchToProps = (dispatch) => ({
    submitSettings: (data) => dispatch(submitSettings(data)),
    regenerateTeams: () => dispatch(regenerateTeams()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Settings);
