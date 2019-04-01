import React from "react";
import { StyleSheet, Text, View, TouchableHighlight, TextInput, ScrollView } from "react-native";

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            names: this.props.names,
            p1: this.props.names[0],
            p2: this.props.names[1],
            p3: this.props.names[2],
            p4: this.props.names[3],
            p5: this.props.names[4],
            p6: this.props.names[5],
            p7: this.props.names[6],
            p8: this.props.names[7],
            p9: this.props.names[8],
            p10: this.props.names[9],
        };


        this.handlePress = this.handlePress.bind(this);
        // this.handleInputChange = this.handleInputChange.bind(this);
    }

    handlePress() {
        this.props.navigation.navigate("Teams");
    }

    // handleInputChange(text) {
    //     this.setState({ names: this.state.names.map((player, i) => (player = i === 0 ? text : player))};
    // }
    

    render() {
        console.log(this.state.names);

        return (
            <View style={styles.container}>
                <Text>Enter Participants</Text>

                <TextInput style={styles.textInput} value={this.state.names[0]}
                    onChangeText={(text) => this.setState({ names: this.state.names.map((player, i) => (player = i === 0 ? text : player))})} />
                <TextInput style={styles.textInput} value={this.state.names[1]}
                    onChangeText={(text) => this.setState({ names: this.state.names.map((player, i) => (player = i === 1 ? text : player))})} />
                <TextInput style={styles.textInput} value={this.state.names[2]}
                    onChangeText={(text) => this.setState({ names: this.state.names.map((player, i) => (player = i === 2 ? text : player))})} />
                <TextInput style={styles.textInput} value={this.state.names[3]}
                    onChangeText={(text) => this.setState({ names: this.state.names.map((player, i) => (player = i === 3 ? text : player))})} />
                <TextInput style={styles.textInput} value={this.state.names[4]}
                    onChangeText={(text) => this.setState({ names: this.state.names.map((player, i) => (player = i === 4 ? text : player))})} />
                <TextInput style={styles.textInput} value={this.state.names[5]}
                    onChangeText={(text) => this.setState({ names: this.state.names.map((player, i) => (player = i === 5 ? text : player))})} />
                <TextInput style={styles.textInput} value={this.state.names[6]}
                    onChangeText={(text) => this.setState({ names: this.state.names.map((player, i) => (player = i === 6 ? text : player))})} />
                <TextInput style={styles.textInput} value={this.state.names[7]}
                    onChangeText={(text) => this.setState({ names: this.state.names.map((player, i) => (player = i === 7 ? text : player))})} />
                <TextInput style={styles.textInput} value={this.state.names[8]}
                    onChangeText={(text) => this.setState({ names: this.state.names.map((player, i) => (player = i === 8 ? text : player))})} />
                <TextInput style={styles.textInput} value={this.state.names[9]}
                    onChangeText={(text) => this.setState({ names: this.state.names.map((player, i) => (player = i === 9 ? text : player))})} />




                <TouchableHighlight style={styles.btn} underlayColor={"#1B5E20"} onPress={this.handlePress}>
                    <Text style={styles.btnText}>click</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
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
