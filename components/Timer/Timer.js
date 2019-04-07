import React from "react";
import { StyleSheet, View } from "react-native";
import CountDown from "react-native-countdown-component";
import { Audio } from "expo";

export class Timer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            gameTimeMins: this.props.gameTime < 60 ? this.props.gameTime * 60 : 3599,
        };

        this.endGame = this.endGame.bind(this);
    }

    endGame() {
        Audio.setIsEnabledAsync(true);
        const sound = new Audio.Sound();
        const play_sound = (async () => {
            await sound.loadAsync(require("../../assets/sounds/endWhistle.mp3")); //Error Here
            await sound.playAsync();
        })();
    }

    render() {
        return (
            <CountDown
                size={70}
                until={this.state.gameTimeMins}
                onFinish={this.endGame}
                digitStyle={{
                    backgroundColor: "transparent",
                }}
                digitTxtStyle={{ color: "#FFF" }}
                separatorStyle={{ color: "#FFF" }}
                timeToShow={["M", "S"]}
                timeLabels={{ m: null, s: null }}
                showSeparator
                running={!this.props.gamePaused}
            />
        );
    }
}

const styles = StyleSheet.create({
    counterStyle: {
        fontFamily: "montserrat-bold",
        color: "#FFF",
        fontSize: 60,
    },
});

export default Timer;
