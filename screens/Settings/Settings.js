import React from "react";
import { View, TouchableHighlight, TouchableOpacity, SafeAreaView, TextInput, Keyboard, Platform, AsyncStorage } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import SwitchToggle from "react-native-switch-toggle";
import { BoldText, RegText } from "../../components/typefaces/Montserrat.js";
import styles from "./styles";

const isIOS = Platform.OS === "ios";

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            numberOfTeams: this.props.settings.numberOfTeams,
            ratingsOn: this.props.settings.ratingsOn,
            looseRatings: this.props.settings.looseRatings,
            gameTime: this.props.settings.gameTime,
            gamePaused: true,
            gamePauseText: "Start",
            showCoinToss: this.props.settings.showCoinToss,
        };

        this.handleSumbitSettings = this.handleSumbitSettings.bind(this);
        this.handleAndroidInputChange = this.handleAndroidInputChange.bind(this);
        this.handleAndroidGameTime = this.handleAndroidGameTime.bind(this);
        this.handleRatingsSwitch = this.handleRatingsSwitch.bind(this);
        this.handleLooseRatingsSwitch = this.handleLooseRatingsSwitch.bind(this);
        this.handleCoinTossSwitch = this.handleCoinTossSwitch.bind(this);
    }

    handleSumbitSettings() {
        this.props.submitSettings(this.state);
        AsyncStorage.multiSet([["settings", JSON.stringify(this.state)]]);
        this.props.navigation.goBack();
        if (typeof this.props.navigation.state.params !== "undefined") {
            this.props.navigation.state.params._regenerateTeams();
        }
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

    handleAndroidGameTime = (text) => {
        if (text !== "") {
            if (/^\d+$/.test(text)) {
                this.setState({
                    gameTime: +text <= 0 ? 1 : +text > 60 ? 60 : +text,
                });
            }
        } else {
            this.setState({
                gameTime: "",
            });
        }
    };

    handleRatingsSwitch() {
        this.setState({ ratingsOn: !this.state.ratingsOn });
    }

    handleLooseRatingsSwitch() {
        this.setState({ looseRatings: !this.state.looseRatings });
    }

    handleCoinTossSwitch() {
        this.setState({ showCoinToss: !this.state.showCoinToss });
    }

    render() {
        const { numberOfTeams } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <KeyboardAwareScrollView contentContainerStyle={styles.keyboardContainer} extraScrollHeight={100} keyboardShouldPersistTaps="handled">
                    <View style={styles.InnerContainer}>
                        <BoldText style={styles.settingHeading}>Settings</BoldText>
                        <View style={styles.settingRow}>
                            <BoldText style={styles.settingName}>Number of Teams (2-9):</BoldText>

                            {isIOS ? (
                                <TextInput
                                    keyboardType={"number-pad"}
                                    clearTextOnFocus={true}
                                    OnBlur={Keyboard.dismiss()}
                                    maxLength={1}
                                    style={styles.textInput}
                                    value={numberOfTeams === 0 ? "" : `${numberOfTeams}`}
                                    onChangeText={(text) => this.setState({ numberOfTeams: text === "0" || text === "1" ? 2 : +text })}
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
                            <View style={styles.ratingsContainer}>
                                <View style={styles.ratingsRow}>
                                    <TouchableOpacity color="#fff" onPress={this.handleLooseRatingsSwitch}>
                                        <RegText style={styles.ratingsName}>Precise</RegText>
                                    </TouchableOpacity>
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
                                    <TouchableOpacity color="#fff" onPress={this.handleLooseRatingsSwitch}>
                                        <RegText style={[styles.ratingsName, { textAlign: "right" }]}>Loose</RegText>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.ratingsRow}>
                                    <RegText style={[styles.ratingsName, { fontSize: 12, textAlign: "center" }]}>
                                        Precise ratings uses the exact values you enter. Loose ratings creates some variety in the teams, but tries to
                                        still spread the skill level evenly between the teams.
                                    </RegText>
                                </View>
                            </View>
                        ) : null}
                        <View style={styles.settingRow}>
                            <BoldText style={styles.settingName}>Mins per Match (max 60): </BoldText>
                            {isIOS ? (
                                <TextInput
                                    style={styles.textInput}
                                    keyboardType={"number-pad"}
                                    clearTextOnFocus={true}
                                    OnBlur={Keyboard.dismiss()}
                                    style={styles.textInput}
                                    maxLength={2}
                                    defaultValue={this.state.gameTime === 0 ? "" : `${this.state.gameTime}`}
                                    onTextChange={(text) => {
                                        this.setState({ gameTime: +text <= 0 ? 1 : +text > 60 ? 60 : +text });
                                    }}
                                />
                            ) : (
                                <TextInput
                                    keyboardType={"number-pad"}
                                    onFocus={() => this.setState({ gameTime: "" })}
                                    maxLength={2}
                                    style={styles.textInput}
                                    value={this.state.gameTime === 0 ? "" : `${this.state.gameTime}`}
                                    onChangeText={this.handleAndroidGameTime}
                                />
                            )}
                        </View>
                        <View style={styles.settingRow}>
                            <BoldText style={styles.settingName}>Show Coin Toss button:</BoldText>
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
                                switchOn={this.state.showCoinToss}
                                onPress={this.handleCoinTossSwitch}
                                circleColorOff="#4F9F4F"
                                circleColorOn="#FFF"
                                duration={500}
                            />
                        </View>
                    </View>
                    <View style={styles.btnContainer}>
                        <View style={styles.btnInnerContainer}>
                            <TouchableHighlight style={styles.btn} underlayColor={"#1B5E20"} onPress={() => this.props.navigation.goBack()}>
                                <BoldText style={styles.btnText}>Back</BoldText>
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.btn} underlayColor={"#1B5E20"} onPress={this.handleSumbitSettings}>
                                <BoldText style={styles.btnText}>OK</BoldText>
                            </TouchableHighlight>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </SafeAreaView>
        );
    }
}
