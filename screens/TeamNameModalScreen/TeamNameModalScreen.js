import React from "react";
import { StyleSheet, Text, View, TouchableHighlight, TextInput, ScrollView, Modal } from "react-native";

export default class App extends React.Component {
    constructor(props) {
        super(props);
    
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Enter Participants</Text>

                {/* <TextInput
                    style={styles.textInput}
                    value={this.state.names[0]}
                    onChangeText={(text) =>
                        this.setState({
                            names: this.state.names.map((player, i) => (player = i === 0 ? text : player)),
                        })
                    }
                /> */}

                <TouchableHighlight style={styles.btn} underlayColor={"#1B5E20"} onPress={() => this.props.navigation.goBack()}>
                    <Text style={styles.btnText}>Back</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        alignItems: "center",
        justifyContent: "center",
    },
    textInput: {
        borderColor: "#69B569",
        borderWidth: 1,
        borderRadius: 5,
        width: "80%",
        marginBottom: 8,
        paddingHorizontal: 5,
    },
    btn: {
        alignItems: "center",
        justifyContent: "center",
        width: 200,
        height: 50,
        borderRadius: 8,
        backgroundColor: "#388E3C",
        marginBottom: 10,
    },
    btnText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#FFF",
    },
});
