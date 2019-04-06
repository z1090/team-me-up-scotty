import { connect } from "react-redux";
import TeamsScreen from "./TeamsScreen";
import { regenerateTeams, saveTeamName } from "../../data/stateActions";

const mapStateToProps = ({ teams, settings }) => ({
    teams,
    ratingsOn: settings.ratingsOn,
    looseRatings: settings.looseRatings,
});

const mapDispatchToProps = (dispatch) => ({
    regenerateTeams: () => dispatch(regenerateTeams()),
    saveTeamName: (data) => dispatch(saveTeamName(data)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TeamsScreen);
