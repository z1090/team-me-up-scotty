import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    SafeAreaView,
    TextInput,
    ScrollView,
    Modal,
    Keyboard,
    Platform,
} from "react-native";
import { isIphoneX } from "../../data/isIphoneX";
import { FontAwesome as Icon } from "@expo/vector-icons";
import { BoldText, RegText } from "../../components/typefaces/Montserrat.js";

const HEADER_SIZE = isIphoneX() ? 100 : 60;
const isIOS = Platform.OS === "ios";

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = { numberOfTeams: this.props.settings.numberOfTeams };

        this.handleSumbitSettings = this.handleSumbitSettings.bind(this);
        this.handleAndroidInputChange = this.handleAndroidInputChange.bind(this);
    }

    handleSumbitSettings() {
        console.log(this.state);
        this.props.submitSettings(this.state);
        this.props.navigation.goBack();
    }

    handleAndroidInputChange = (text) => {
        if (text !== "") {
            if (/^\d+$/.test(text)) {
                this.setState({
                    numberOfTeams: text === "0" || text === "1" ? 2 : +text,
                });
            }
        } else {
            this.setState({
                numberOfTeams: "",
            });
        }
    };

    render() {
        const { numberOfTeams } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.InnerContainer}>
                    <BoldText style={styles.settingHeading}>Settings</BoldText>
                    <View style={styles.settingRow}>
                        <BoldText style={styles.settingName}>
                            Number of Teams: <RegText style={styles.settingName}>(2-9)</RegText>
                        </BoldText>

                        {isIOS ? (
                            <TextInput
                                keyboardType={"number-pad"}
                                clearTextOnFocus={true}
                                OnBlur={Keyboard.dismiss()}
                                maxLength={1}
                                style={styles.textInput}
                                value={numberOfTeams === 0 ? "" : `${numberOfTeams}`}
                                onChangeText={(text) =>
                                    this.setState({ numberOfTeams: text === "0" || text === "1" ? 2 : +text })
                                }
                            />
                        ) : (
                            <TextInput
                                keyboardType={"number-pad"}
                                onFocus={() => this.setState({ numberOfTeams: "" })}
                                maxLength={1}
                                style={styles.textInput}
                                value={numberOfTeams === 0 ? "" : `${numberOfTeams}`}
                                onChangeText={this.handleAndroidInputChange}
                            />
                        )}
                    </View>
                </View>
                <View style={styles.btnContainer}>
                    <View style={styles.btnInnerContainer}>
                        <TouchableHighlight
                            style={styles.btn}
                            underlayColor={"#1B5E20"}
                            onPress={() => this.props.navigation.goBack()}
                        >
                            <BoldText style={styles.btnText}>Back</BoldText>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={styles.btn}
                            underlayColor={"#1B5E20"}
                            onPress={this.handleSumbitSettings}
                        >
                            <BoldText style={styles.btnText}>OK</BoldText>
                        </TouchableHighlight>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

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
        width: "80%",
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
    settingHeading: {
        color: "#448844",
        fontSize: 22,
    },
    settingName: {
        flex: 1,
        color: "#4F9F4F",
    },
    settingRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    textInput: {
        borderColor: "#69B569",
        borderWidth: 1,
        borderRadius: 5,
        width: 50,
        height: 25,
        // marginBottom: 8,
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
