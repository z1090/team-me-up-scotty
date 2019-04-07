import { connect } from "react-redux";
import StartScreen from "./StartScreen";
import { submitSettings } from "../../data/actionCreators";

const mapStateToProps = ({ names }) => ({
    names,
});

const mapDispatchToProps = (dispatch) => ({
    submitSettings: (data) => dispatch(submitSettings(data)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StartScreen);
