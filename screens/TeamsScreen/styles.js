import { StyleSheet } from "react-native";
import { HEADER_SIZE } from "../../utilities/isIphoneX";

const styles = StyleSheet.create({
    container: {
        flex: 3,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginTop: HEADER_SIZE + 20,
    },
    modalOuterContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 150,
        marginBottom: 200,
    },
    modalContainer: {
        width: "93%",
        height: 140,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        borderRadius: 5,
    },
    background: {
        width: "100%",
        flex: 1,
    },
    heading: {
        flex: 1,
    },
    headingText: {
        fontSize: 20,
    },

    playerRow: {
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    teamNameContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        width: "100%",
        paddingLeft: 20,
        paddingRight: 15,
    },
    teamNameUnderline: {
        marginLeft: 20,
        marginRight: 15,
        marginBottom: 8,
        borderBottomWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.5)",
    },
    teamNameIcon: {
        width: 20,
        marginTop: 5,
        marginLeft: 20,
    },
    teamList: {
        paddingHorizontal: 20,
        paddingBottom: 2,
    },
    teamListPadding: {
        paddingBottom: 20,
    },
    teamRating: {
        paddingHorizontal: 20,
    },
    textInput: {
        borderColor: "#69B569",
        borderWidth: 1,
        borderRadius: 5,
        height: 35,
        marginTop: 10,
        marginBottom: 10,
        paddingHorizontal: 5,
        fontFamily: "montserrat-regular",
        color: "#000",
    },
    smallBtnRow: {
        marginTop: 5,
        flexDirection: "row",
        justifyContent: "center",
    },
    lowerBtnContainer: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default styles;
