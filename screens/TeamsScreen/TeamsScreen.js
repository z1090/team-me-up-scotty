import React from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";

import { BoldText, RegText } from "../../components/typefaces/Montserrat.js";
import { isIphoneX } from "../../data/isIphoneX";

const HEADER_SIZE = isIphoneX() ? 100 : 60;

import BackgroundImg from "../../assets/teams-background.jpg";

export default class App extends React.Component {
    static navigationOptions = {
        title: "Teams",
    };
    render() {
        return (
            <ImageBackground source={BackgroundImg} style={styles.background}>
                <View style={styles.container}>
                    <View style={styles.innerContainer}>
                        <BoldText style={styles.heading}>Team 1</BoldText>
                        <RegText>1 - {this.props.teams.team1[0]}</RegText>
                        <RegText>2 - {this.props.teams.team1[1]}</RegText>
                        <RegText>3 - {this.props.teams.team1[2]}</RegText>
                        <RegText>4 - {this.props.teams.team1[3]}</RegText>
                        <RegText>5 - {this.props.teams.team1[4]}</RegText>
                    </View>
                    <View style={styles.innerContainer}>
                        <BoldText style={styles.heading}>Team 2</BoldText>
                        <RegText>1 - {this.props.teams.team2[0]}</RegText>
                        <RegText>2 - {this.props.teams.team2[1]}</RegText>
                        <RegText>3 - {this.props.teams.team2[2]}</RegText>
                        <RegText>4 - {this.props.teams.team2[3]}</RegText>
                        <RegText>5 - {this.props.teams.team2[4]}</RegText>
                    </View>
                    <View style={styles.innerContainer} />
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginTop: HEADER_SIZE,
    },
    innerContainer: {
        flex: 1,
        width: "80%",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        marginVertical: 20,
        // backgroundColor: "blue",
    },
    background: {
        width: "100%",
        flex: 1,
    },
    heading: {
        fontSize: 26,
        marginBottom: 8,
    },
});
