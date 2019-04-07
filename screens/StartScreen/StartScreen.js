import React from "react";
import { View, ImageBackground, Image } from "react-native";

import Button from "../../components/Button";
import styles from "./styles";

import startBackgroundImg from "../../assets/images/start-background.jpg";
import logo from "../../assets/images/logo.png";

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
