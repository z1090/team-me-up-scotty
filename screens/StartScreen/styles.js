import { StyleSheet } from "react-native";
import { HEADER_SIZE } from "../../utilities/isIphoneX";

const styles = StyleSheet.create({
    container: {
        flex: 7,
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-end",
        marginBottom: "15%",
    },
    imgContainer: {
        flex: 4,
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: HEADER_SIZE,
    },
    background: {
        width: "100%",
        flex: 1,
    },
});

export default styles;
