import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    TextInput,
    Dimensions,
    ImageBackground,
    SafeAreaView,
    TouchableOpacity,
    Alert,
    AsyncStorage,
    FlatList,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { BoldText } from "../../components/typefaces/Montserrat.js";
import { isIphoneX } from "../../data/isIphoneX";
import { FontAwesome as Icon } from "@expo/vector-icons";
import { noDuplicates } from "../../data/validateInputs";

const HEADER_SIZE = isIphoneX() ? 100 : 60;

import BackgroundImg from "../../assets/participants-background.jpg";

const win = Dimensions.get("window");

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            names: this.props.names,
            loading: false,
        };
        this.handlePress = this.handlePress.bind(this);
        this._resetAlertHandler = this._resetAlertHandler.bind(this);
        this._goToSettingsModal = this._goToSettingsModal.bind(this);
        this._resetInputs = this._resetInputs.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.refreshData = this.refreshData.bind(this);
        this.addParticipant = this.addParticipant.bind(this);
        this.deleteParticipant = this.deleteParticipant.bind(this);
        this.removeEmptyInputs = this.removeEmptyInputs.bind(this);
        this.noEmptyInputs = this.noEmptyInputs.bind(this);
    }

    static navigationOptions = ({ navigation }) => ({
        title: "Participants",
        headerRight: (
            <View style={{ flexDirection: "row" }}>
                <TouchableOpacity title="reset" color="#fff" onPress={navigation.getParam("_resetAlertHandler")}>
                    <Icon style={styles.icon} name="undo" size={24} color="#FFF" />
                </TouchableOpacity>
                <TouchableOpacity title="reset" color="#fff" onPress={navigation.getParam("_goToSettingsModal")}>
                    <Icon style={styles.settingsIcon} name="ellipsis-v" size={24} color="#FFF" />
                </TouchableOpacity>
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
            [
                { text: "Cancel", onPress: () => {}, style: "cancel" },
                { text: "OK", onPress: () => this._resetInputs() },
            ],
            { cancelable: false }
        );
    }

    async _resetInputs() {
        await this.props.onResetInputs();
        await this.setState({ names: this.props.names });
        this.inputIndex.focus();
    }

    async addParticipant() {
        await this.setState({ names: this.state.names.concat("") });
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

    async removeEmptyInputs(array) {
        const reducedNames = array.reduce((acc, val) => {
            if (val !== "") {
                acc.push(val);
            }
            return acc;
        }, []);
        await this.setState({ names: reducedNames });
        this.handlePress();
    }

    noEmptyInputs(array) {
        for (let i = 0; i < array.length; i += 1) {
            if (array[i] === "") {
                Alert.alert(
                    "Inputs can't be empty",
                    "Remove empty inputs and continue?",
                    [
                        { text: "Cancel", onPress: () => {}, style: "cancel" },
                        { text: "OK", onPress: () => this.removeEmptyInputs(array) },
                    ],
                    { cancelable: false }
                );
                return null;
            }
        }
        return this.handlePress();
    }

    handlePress() {
        const { names } = this.state;
        if (noDuplicates(names) && this.state.names.length >= 3) {
            this.props.onGenerateTeams(this.state);
            AsyncStorage.multiSet([["names", JSON.stringify(names)]]);
            this.props.navigation.navigate("Teams");
        } else if (!noDuplicates(names)) {
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
                    value={item}
                    onChange={(e) => {
                        newNames[index] = e.nativeEvent.text;
                        this.setState({ names: newNames });
                    }}
                />
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
    refreshData() {
        this.setState({ loading: true });
        this.setState({ names: this.props.names, loading: false });
    }

    render() {
        const { names, loading } = this.state;
        return (
            <ImageBackground source={BackgroundImg} style={styles.background}>
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
                                    renderItem={this.renderItem}
                                    keyExtractor={this.keyExtractor}
                                    onRefresh={this.refreshData}
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
                            <TouchableHighlight
                                style={styles.btn}
                                underlayColor={"#1B5E20"}
                                onPress={() => this.noEmptyInputs(this.state.names)}
                            >
                                <BoldText style={styles.btnText}>Generate Teams</BoldText>
                            </TouchableHighlight>
                        )}
                    </View>
                </SafeAreaView>
            </ImageBackground>
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
        alignItems: "center",
        justifyContent: "flex-start",
    },
    scrollContainer: {
        width: win.width,
        alignItems: "center",
        marginTop: 30,
        paddingBottom: 50,
        // backgroundColor: "blue",
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
        // paddingLeft: 15,
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
        marginRight: 20,
    },
    settingsIcon: {
        marginRight: 22,
    },
});
