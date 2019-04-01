import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Team 1</Text>
                <Text>{this.props.teams.team1[0]}</Text>
                <Text>{this.props.teams.team1[2]}</Text>
                <Text>{this.props.teams.team1[3]}</Text>
                <Text>{this.props.teams.team1[4]}</Text>
                <Text>{this.props.teams.team1[5]}</Text>
                <Text>Team 2</Text>
                <Text>{this.props.teams.team2[0]}</Text>
                <Text>{this.props.teams.team2[2]}</Text>
                <Text>{this.props.teams.team2[3]}</Text>
                <Text>{this.props.teams.team2[4]}</Text>
                <Text>{this.props.teams.team2[5]}</Text>
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
});
