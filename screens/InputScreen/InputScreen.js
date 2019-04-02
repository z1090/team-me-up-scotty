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
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { BoldText, RegText } from "../../components/typefaces/Montserrat.js";
import { isIphoneX } from "../../data/isIphoneX";

const HEADER_SIZE = isIphoneX() ? 100 : 60;

import BackgroundImg from "../../assets/participants-background.jpg";

const win = Dimensions.get("window");

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            names: this.props.names,
        };
        this.handlePress = this.handlePress.bind(this);
        // this.handleInputChange = this.handleInputChange.bind(this);
    }

    static navigationOptions = {
        title: "Participants",
    };

    handlePress() {
        this.props.onGenerateTeams(this.state);
        this.props.navigation.navigate("Teams");
    }

    // handleInputChange(text) {
    //     this.setState({ names: this.state.names.map((player, i) => (player = i === 0 ? text : player))};
    // }

    render() {
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
                                <TextInput
                                    style={styles.textInput}
                                    value={this.state.names[0]}
                                    onChangeText={(text) =>
                                        this.setState({
                                            names: this.state.names.map(
                                                (player, i) => (player = i === 0 ? text : player)
                                            ),
                                        })
                                    }
                                />
                                <TextInput
                                    style={styles.textInput}
                                    value={this.state.names[1]}
                                    onChangeText={(text) =>
                                        this.setState({
                                            names: this.state.names.map(
                                                (player, i) => (player = i === 1 ? text : player)
                                            ),
                                        })
                                    }
                                />
                                <TextInput
                                    style={styles.textInput}
                                    value={this.state.names[2]}
                                    onChangeText={(text) =>
                                        this.setState({
                                            names: this.state.names.map(
                                                (player, i) => (player = i === 2 ? text : player)
                                            ),
                                        })
                                    }
                                />
                                <TextInput
                                    style={styles.textInput}
                                    value={this.state.names[3]}
                                    onChangeText={(text) =>
                                        this.setState({
                                            names: this.state.names.map(
                                                (player, i) => (player = i === 3 ? text : player)
                                            ),
                                        })
                                    }
                                />
                                <TextInput
                                    style={styles.textInput}
                                    value={this.state.names[4]}
                                    onChangeText={(text) =>
                                        this.setState({
                                            names: this.state.names.map(
                                                (player, i) => (player = i === 4 ? text : player)
                                            ),
                                        })
                                    }
                                />
                                <TextInput
                                    style={styles.textInput}
                                    value={this.state.names[5]}
                                    onChangeText={(text) =>
                                        this.setState({
                                            names: this.state.names.map(
                                                (player, i) => (player = i === 5 ? text : player)
                                            ),
                                        })
                                    }
                                />
                                <TextInput
                                    style={styles.textInput}
                                    value={this.state.names[6]}
                                    onChangeText={(text) =>
                                        this.setState({
                                            names: this.state.names.map(
                                                (player, i) => (player = i === 6 ? text : player)
                                            ),
                                        })
                                    }
                                />
                                <TextInput
                                    style={styles.textInput}
                                    value={this.state.names[7]}
                                    onChangeText={(text) =>
                                        this.setState({
                                            names: this.state.names.map(
                                                (player, i) => (player = i === 7 ? text : player)
                                            ),
                                        })
                                    }
                                />
                                <TextInput
                                    style={styles.textInput}
                                    value={this.state.names[8]}
                                    onChangeText={(text) =>
                                        this.setState({
                                            names: this.state.names.map(
                                                (player, i) => (player = i === 8 ? text : player)
                                            ),
                                        })
                                    }
                                />
                                <TextInput
                                    style={styles.textInput}
                                    value={this.state.names[9]}
                                    onChangeText={(text) =>
                                        this.setState({
                                            names: this.state.names.map(
                                                (player, i) => (player = i === 9 ? text : player)
                                            ),
                                        })
                                    }
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
        flex: 2,
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
});
