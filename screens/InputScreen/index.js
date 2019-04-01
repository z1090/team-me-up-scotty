import { connect } from "react-redux";
import InputScreen from "./InputScreen";

const mapStateToProps = ({ names }) => ({
    names,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InputScreen);
