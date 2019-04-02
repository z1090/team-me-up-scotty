import { connect } from "react-redux";
import TeamsScreen from "./TeamsScreen";
import { regenerateTeams } from "../../data/stateActions";

const mapStateToProps = ({ teams }) => ({
    teams,
});

const mapDispatchToProps = (dispatch) => ({
    regenerateTeams: () => dispatch(regenerateTeams()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TeamsScreen);
