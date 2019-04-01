import { connect } from "react-redux";
import InputScreen from "./InputScreen";

const mapStateToProps = ({ userName }) => ({
    userName,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InputScreen);
