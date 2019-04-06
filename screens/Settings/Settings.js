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
import SwitchToggle from "react-native-switch-toggle";
import { isIphoneX } from "../../data/isIphoneX";
import { FontAwesome as Icon } from "@expo/vector-icons";
import { BoldText, RegText } from "../../components/typefaces/Montserrat.js";

const HEADER_SIZE = isIphoneX() ? 100 : 60;
const isIOS = Platform.OS === "ios";

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            numberOfTeams: this.props.settings.numberOfTeams,
            ratingsOn: this.props.settings.ratingsOn,
            looseRatings: this.props.settings.looseRatings,
        };

        this.handleSumbitSettings = this.handleSumbitSettings.bind(this);
        this.handleAndroidInputChange = this.handleAndroidInputChange.bind(this);
        this.handleRatingsSwitch = this.handleRatingsSwitch.bind(this);
        this.handleLooseRatingsSwitch = this.handleLooseRatingsSwitch.bind(this);
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

    handleRatingsSwitch() {
        this.setState({ ratingsOn: !this.state.ratingsOn });
    }

    handleLooseRatingsSwitch() {
        this.setState({ looseRatings: !this.state.looseRatings });
    }

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
                    <View style={styles.settingRow}>
                        <BoldText style={styles.settingName}>Use player ratings:</BoldText>
                        <SwitchToggle
                            containerStyle={{
                                width: 50,
                                height: 20,
                                borderRadius: 30,
                                padding: 5,
                            }}
                            backgroundColorOn="#4F9F4F"
                            backgroundColorOff="#e5e5e5"
                            circleStyle={{
                                width: 12,
                                height: 12,
                                borderRadius: 6,
                                backgroundColor: "#FFF",
                            }}
                            switchOn={this.state.ratingsOn}
                            onPress={this.handleRatingsSwitch}
                            circleColorOff="#4F9F4F"
                            circleColorOn="#FFF"
                            duration={500}
                        />
                    </View>
                    {this.state.ratingsOn ? (
                        <View style={styles.ratingsRow}>
                            <RegText style={styles.ratingsName}>Precise ratings</RegText>
                            <View style={styles.ratingTypeSwitch}>
                                <SwitchToggle
                                    containerStyle={{
                                        width: 50,
                                        height: 20,
                                        borderRadius: 30,
                                        padding: 5,
                                    }}
                                    backgroundColorOn="#e5e5e5"
                                    backgroundColorOff="#e5e5e5"
                                    circleStyle={{
                                        width: 12,
                                        height: 12,
                                        borderRadius: 6,
                                        backgroundColor: "#FFF",
                                    }}
                                    switchOn={this.state.looseRatings}
                                    onPress={this.handleLooseRatingsSwitch}
                                    circleColorOff="#4F9F4F"
                                    circleColorOn="#4F9F4F"
                                    duration={500}
                                />
                            </View>

                            <RegText style={[styles.ratingsName, { textAlign: "right" }]}>Loose ratings</RegText>
                        </View>
                    ) : null}
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
        // backgroundColor: "red",
    },
    settingRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    ratingsRow: {
        width: 200,
        alignSelf: "center",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        marginBottom: 20,
        // backgroundColor: "blue",
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
