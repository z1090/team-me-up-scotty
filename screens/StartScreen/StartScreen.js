import React from "react";
import { StyleSheet, View, ImageBackground, Image } from "react-native";

import Button from "../../components/Button";

import { HEADER_SIZE } from "../../utilities/isIphoneX";

import startBackgroundImg from "../../assets/start-background.jpg";
import logo from "../../assets/logo.png";

export default class StartScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ImageBackground source={startBackgroundImg} style={styles.background}>
                <View style={styles.imgContainer}>
                    <Image source={logo} style={{ width: 100, height: 209 }} />
                </View>
                <View style={styles.container}>
                    {this.props.names.length < 3 ? null : <Button onPress={() => this.props.navigation.navigate("Teams")}>Quick Start</Button>}
                    <Button onPress={() => this.props.navigation.navigate("Input")}>Enter Participants</Button>
                    <Button onPress={() => this.props.navigation.navigate("Settings")}>Settings</Button>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 7,
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-end",
        marginBottom: "15%",
    },
    imgContainer: {
        flex: 4,
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: HEADER_SIZE,
    },
    background: {
        width: "100%",
        flex: 1,
    },
});
