import { StyleSheet, Dimensions } from "react-native";
import { HEADER_SIZE } from "../../utilities/isIphoneX";

const win = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
        marginTop: HEADER_SIZE,
    },
    InnerContainer: {
        flex: 3,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    scrollContainer: {
        width: win.width,
        alignItems: "center",
        marginTop: 30,
        paddingBottom: 50,
    },
    inputContainer: {
        width: "80%",
    },
    addBtnContainer: {
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
        marginTop: 20,
    },
    inputRow: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    rowDelete: {
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#69B569",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        height: 35,
        width: 30,
        marginBottom: 8,
        paddingTop: 0,
        color: "#FFF",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
    rowNumberContainer: {
        justifyContent: "center",
        borderColor: "#69B569",
        borderWidth: 1,
        borderRightWidth: 0,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        height: 35,
        width: 37,
        marginBottom: 8,
        paddingTop: 7,
        paddingLeft: 5,
    },
    rowNumber: {
        justifyContent: "center",
        marginBottom: 8,
        paddingLeft: 5,
        fontFamily: "montserrat-bold",
        color: "#FFF",
    },
    textInput: {
        flex: 1,
        borderColor: "#69B569",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        height: 35,
        marginBottom: 8,
        paddingRight: 8,
        fontFamily: "montserrat-regular",
        color: "#FFF",
    },
    ratingInput: {
        borderColor: "#69B569",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        width: 35,
        height: 35,
        marginBottom: 8,
        paddingRight: 8,
        fontFamily: "montserrat-regular",
        color: "#FFF",
        textAlign: "right",
    },
    btnContainer: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
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
    background: {
        width: "100%",
        flex: 1,
    },
    icon: {
        marginRight: 15,
    },
    settingsIcon: {
        marginLeft: 20,
        marginRight: 22,
    },
});

export default styles;
