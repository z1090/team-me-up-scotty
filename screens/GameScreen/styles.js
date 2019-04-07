import { StyleSheet } from "react-native";
import { HEADER_SIZE } from "../../utilities/isIphoneX";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: HEADER_SIZE + 50,
    },
    innerContainer: {
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: 200,
        backgroundColor: "blue",
    },
    background: {
        width: "100%",
        flex: 1,
    },
    btn: {
        alignItems: "center",
        justifyContent: "center",
        width: 200,
        height: 50,
        borderRadius: 8,
        backgroundColor: "#388E3C",
        marginVertical: 20,
    },
    btnText: {
        fontSize: 18,
        color: "#FFF",
    },
});

export default styles;
