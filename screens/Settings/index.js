import { connect } from "react-redux";
import Settings from "./Settings";
import { submitSettings } from "../../data/stateActions";


const mapStateToProps = ({ settings }) => ({
    settings,
});

const mapDispatchToProps = (dispatch) => ({
    submitSettings: (data) => dispatch(submitSettings(data)),

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Settings);
