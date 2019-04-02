import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    TextInput,
    ScrollView,
    Dimensions,
    ImageBackground,
    SafeAreaView,
    TouchableOpacity,
    Alert,
    AsyncStorage,
    FlatList,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { BoldText, RegText } from "../../components/typefaces/Montserrat.js";
import { isIphoneX } from "../../data/isIphoneX";
import { FontAwesome as Icon } from "@expo/vector-icons";

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
        this._resetInputs = this._resetInputs.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.refreshData = this.refreshData.bind(this);
    }

    static navigationOptions = ({ navigation }) => ({
        title: "Participants",
        headerRight: (
            <TouchableOpacity title="reset" color="#fff" onPress={navigation.getParam("_resetAlertHandler")}>
                <Icon style={styles.icon} name="close" size={24} color="#FFF" />
            </TouchableOpacity>
        ),
    });

    componentDidMount() {
        this.props.navigation.setParams({ _resetAlertHandler: this._resetAlertHandler });
    }

    _resetAlertHandler() {
        Alert.alert(
            "Reset Participants?",
            "",
            [
                { text: "Cancel", onPress: () => console.log("Canceled"), style: "cancel" },
                { text: "OK", onPress: () => this._resetInputs() },
            ],
            { cancelable: false }
        );
    }

    async _resetInputs() {
        await this.props.onResetInputs();
        this.setState({ names: this.props.names });
    }

    handlePress() {
        if (this.state.names[0] !== "") {
            this.props.onGenerateTeams(this.state);
            let namesStr = JSON.stringify(this.state.names);
            AsyncStorage.multiSet([["names", namesStr]], () => {
                console.log("Values stored");
            });
            this.props.navigation.navigate("Teams");
        }
    }


    renderItem({ item, index }) {
        let newNames = [...this.state.names]
        return (<TextInput
            style={styles.textInput}
            value={item}
            onChange={(e) => {
                newNames[index] = e.nativeEvent.text;
                console.log(newNames);
                this.setState({ names: newNames })
            }}
        />)
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
                        </KeyboardAwareScrollView>
                    </View>
                    <View style={styles.btnContainer}>
                        <TouchableHighlight style={styles.btn} underlayColor={"#1B5E20"} onPress={this.handlePress}>
                            <BoldText style={styles.btnText}>Generate Teams</BoldText>
                        </TouchableHighlight>
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
        // backgroundColor: "blue",
    },
    inputContainer: {
        width: "80%",
    },
    textInput: {
        borderColor: "#69B569",
        borderWidth: 1,
        borderRadius: 5,
        height: 35,
        width: "100%",
        marginBottom: 8,
        paddingHorizontal: 5,
        fontFamily: "montserrat-regular",
        color: "#FFF",
    },
    btnContainer: {
        flex: 1,
        // backgroundColor: "yellow",
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
        marginRight: 16,
    },
});
