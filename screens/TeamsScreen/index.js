import { connect } from "react-redux";
import TeamsScreen from "./TeamsScreen";

const mapStateToProps = ({teams}) => ({
    teams,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TeamsScreen);
