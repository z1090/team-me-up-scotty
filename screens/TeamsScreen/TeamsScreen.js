import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Team 1</Text>
                <Text>1 - {this.props.teams.team1[0]}</Text>
                <Text>2 - {this.props.teams.team1[1]}</Text>
                <Text>3 - {this.props.teams.team1[2]}</Text>
                <Text>4 - {this.props.teams.team1[3]}</Text>
                <Text>5 - {this.props.teams.team1[4]}</Text>
                <Text>Team 2</Text>
                <Text>1 - {this.props.teams.team2[0]}</Text>
                <Text>2 - {this.props.teams.team2[1]}</Text>
                <Text>3 - {this.props.teams.team2[2]}</Text>
                <Text>4 - {this.props.teams.team2[3]}</Text>
                <Text>5 - {this.props.teams.team2[4]}</Text>
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
