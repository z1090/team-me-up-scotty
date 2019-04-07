import { connect } from "react-redux";
import TeamsScreen from "./TeamsScreen";
import { regenerateTeams, saveTeamName, resetTimer } from "../../data/actionCreators";

const mapStateToProps = ({ teams, settings }) => ({
    teams,
    ratingsOn: settings.ratingsOn,
    looseRatings: settings.looseRatings,
});

const mapDispatchToProps = (dispatch) => ({
    regenerateTeams: () => dispatch(regenerateTeams()),
    saveTeamName: (data) => dispatch(saveTeamName(data)),
    resetTimer: () => dispatch(resetTimer()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TeamsScreen);
