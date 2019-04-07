import React from "react";
import {
    Text,
    View,
    TouchableHighlight,
    TextInput,
    ImageBackground,
    SafeAreaView,
    TouchableOpacity,
    Alert,
    AsyncStorage,
    FlatList,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { BoldText } from "../../components/typefaces/Montserrat.js";
import { FontAwesome as Icon } from "@expo/vector-icons";

import HeaderIcon from "../../components/HeaderIcon";
import styles from "./styles";

import participantsBackgroundImg from "../../assets/images/participants-background.jpg";

export default class InputScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            names: this.props.names,
            loading: false,
            ratingsOn: this.props.settings.ratingsOn,
        };
        this.handlePress = this.handlePress.bind(this);
        this._resetAlertHandler = this._resetAlertHandler.bind(this);
        this._goToSettingsModal = this._goToSettingsModal.bind(this);
        this._resetInputs = this._resetInputs.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.addParticipant = this.addParticipant.bind(this);
        this.deleteParticipant = this.deleteParticipant.bind(this);
        this.removeEmptyInputs = this.removeEmptyInputs.bind(this);
        this.noDuplicates = this.noDuplicates.bind(this);
        this.noEmptyInputs = this.noEmptyInputs.bind(this);
    }

    static navigationOptions = ({ navigation }) => ({
        title: "Participants",
        headerRight: (
            <View style={{ flexDirection: "row" }}>
                <HeaderIcon iconName={"undo"} onPress={navigation.getParam("_resetAlertHandler")} />
                <HeaderIcon style={{ marginRight: 5, marginLeft: 10 }} iconName={"ellipsis-v"} onPress={navigation.getParam("_goToSettingsModal")} />
            </View>
        ),
    });

    componentDidMount() {
        this.props.navigation.setParams({
            _resetAlertHandler: this._resetAlertHandler,
            _goToSettingsModal: this._goToSettingsModal,
        });
    }

    _goToSettingsModal() {
        this.props.navigation.navigate("Settings");
    }

    _resetAlertHandler() {
        Alert.alert(
            "Reset Participants?",
            "",
            [{ text: "Cancel", onPress: () => {}, style: "cancel" }, { text: "OK", onPress: () => this._resetInputs() }],
            { cancelable: false }
        );
    }

    async _resetInputs() {
        await this.props.onResetInputs();
        await this.setState({ names: this.props.names });
        this.inputIndex.focus();
    }

    async addParticipant() {
        await this.setState({ names: this.state.names.concat({ name: "", enteredRating: 50, randomMatchRating: 50 }) });
        this.inputIndex.focus();
    }

    deleteParticipant(index) {
        let newState = this.state.names.reduce((acc, val, i) => {
            if (i !== index) {
                acc.push(val);
            }
            return acc;
        }, []);
        this.setState({ names: newState });
    }

    noDuplicates = (array) => {
        let checked = Object.create(null);
        for (let i = 0; i < array.length; i += 1) {
            let value = array[i].name;
            if (value in checked) {
                return false;
            }
            checked[value] = false;
        }
        return true;
    };

    async removeEmptyInputs(array) {
        const reducedNames = array.reduce((acc, val) => {
            if (val.name !== "") {
                acc.push(val);
            }
            return acc;
        }, []);
        await this.setState({ names: reducedNames });
        this.handlePress();
    }

    noEmptyInputs(array) {
        for (let i = 0; i < array.length; i += 1) {
            if (array[i].name === "") {
                Alert.alert(
                    "Inputs can't be empty",
                    "Remove empty inputs and continue?",
                    [{ text: "Cancel", onPress: () => {}, style: "cancel" }, { text: "OK", onPress: () => this.removeEmptyInputs(array) }],
                    { cancelable: false }
                );
                return null;
            }
        }
        return this.handlePress();
    }

    handlePress() {
        const { names } = this.state;
        if (this.noDuplicates(names) && this.state.names.length >= 3) {
            this.props.onGenerateTeams(this.state);
            AsyncStorage.multiSet([["names", JSON.stringify(names)]]);
            this.props.navigation.navigate("Teams");
        } else if (!this.noDuplicates(names)) {
            Alert.alert("Duplicate names not allowed", "", [{ text: "Cancel", onPress: () => {}, style: "cancel" }], {
                cancelable: true,
            });
        }
    }

    renderItem({ item, index }) {
        let newNames = [...this.state.names];
        let playerNum = String(index + 1).padStart(2, "0");

        return (
            <View style={styles.inputRow}>
                <View style={styles.rowNumberContainer}>
                    <Text style={styles.rowNumber}>{playerNum}</Text>
                </View>
                <TextInput
                    ref={(input) => {
                        this.inputIndex = input;
                    }}
                    style={styles.textInput}
                    maxLength={30}
                    value={item.name}
                    onChange={(e) => {
                        newNames[index].name = e.nativeEvent.text;
                        this.setState({ names: newNames });
                    }}
                />
                {!this.props.settings.ratingsOn ? null : (
                    <TextInput
                        keyboardType={"number-pad"}
                        style={styles.ratingInput}
                        maxLength={3}
                        value={item.enteredRating === 0 ? "" : `${item.enteredRating}`}
                        onChange={(e) => {
                            const text = +e.nativeEvent.text;
                            newNames[index].enteredRating = text > 100 ? 100 : text < 0 ? 0 : text;
                            this.setState({ names: newNames });
                        }}
                    />
                )}
                <TouchableOpacity
                    style={styles.rowDelete}
                    title="plus"
                    color="#fff"
                    onPress={() => {
                        this.deleteParticipant(index);
                    }}
                >
                    <Icon style={styles.deleteIcon} name="close" size={16} color="#FFF" />
                </TouchableOpacity>
            </View>
        );
    }

    keyExtractor(item, index) {
        return `${index}`;
    }

    render() {
        const { names, loading } = this.state;
        return (
            <ImageBackground source={participantsBackgroundImg} style={styles.background}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.InnerContainer}>
                        <KeyboardAwareScrollView
                            contentContainerStyle={styles.scrollContainer}
                            extraScrollHeight={100}
                            enableOnAndroid={true}
                            keyboardShouldPersistTaps="handled"
                        >
                            <View style={styles.inputContainer}>
                                <FlatList
                                    data={names}
                                    extraData={this.props}
                                    renderItem={this.renderItem}
                                    keyExtractor={this.keyExtractor}
                                    refreshing={loading}
                                />
                            </View>
                            <View style={styles.addBtnContainer}>
                                <TouchableOpacity title="plus" color="#fff" onPress={this.addParticipant}>
                                    <Icon style={styles.icon} name="plus" size={30} color="#FFF" />
                                </TouchableOpacity>
                            </View>
                        </KeyboardAwareScrollView>
                    </View>
                    <View style={styles.btnContainer}>
                        {this.state.names.length < 3 ? null : (
                            <TouchableHighlight style={styles.btn} underlayColor={"#1B5E20"} onPress={() => this.noEmptyInputs(this.state.names)}>
                                <BoldText style={styles.btnText}>Generate Teams</BoldText>
                            </TouchableHighlight>
                        )}
                    </View>
                </SafeAreaView>
            </ImageBackground>
        );
    }
}
