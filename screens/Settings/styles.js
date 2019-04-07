import { StyleSheet } from "react-native";
import { HEADER_SIZE } from "../../utilities/isIphoneX";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
        marginTop: HEADER_SIZE,
    },
    keyboardContainer: {
        flex: 3,
        width: "100%",
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
    InnerContainer: {
        flex: 3,
        width: "80%",
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
    settingHeading: {
        color: "#448844",
        fontSize: 22,
        marginBottom: 20,
    },
    settingName: {
        flex: 1,
        color: "#4F9F4F",
    },
    ratingTypeSwitch: {
        alignContent: "center",
    },
    ratingsName: {
        width: 100,
        flex: 1,
        color: "#4F9F4F",
        lineHeight: 16,
    },
    settingRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    ratingsContainer: {
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
        marginBottom: 20,
    },
    ratingsRow: {
        alignSelf: "center",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        justifyContent: "flex-end",
        marginBottom: 10,
    },
    textInput: {
        borderColor: "#69B569",
        borderWidth: 1,
        borderRadius: 5,
        width: 50,
        height: 25,
        paddingHorizontal: 10,
        fontFamily: "montserrat-regular",
        alignItems: "center",
        justifyContent: "flex-end",
        textAlign: "right",
    },
    btnContainer: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    btnInnerContainer: {
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    btn: {
        alignItems: "center",
        justifyContent: "center",
        width: 120,
        height: 50,
        borderRadius: 8,
        backgroundColor: "#388E3C",
        marginBottom: 10,
        marginHorizontal: 10,
    },
    btnText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#FFF",
    },
});

export default styles;
