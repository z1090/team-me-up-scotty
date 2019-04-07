import React from "react";
import { View, ImageBackground } from "react-native";

import Timer from "../../components/Timer";
import Button from "../../components/Button";
import HeaderIcon from "../../components/HeaderIcon";
import styles from "./styles";

import gameBackgroundImg from "../../assets/images/game-background.jpg";

export default class GameScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "Match",
            headerRight: <HeaderIcon iconName={"undo"} onPress={navigation.getParam("_resetTimer")} />,
        };
    };

    constructor(props) {
        super(props);

        this.state = {
            coinToss: "Coin Toss",
            reset: false,
        };

        this.coinToss = this.coinToss.bind(this);
        this.handlePaused = this.handlePaused.bind(this);
    }

    componentDidMount() {
        this.props.navigation.setParams({
            _resetTimer: async () => {
                await this.props.resetTimer(this.state);
                await this.setState({ coinToss: "Coin Toss", reset: true });
                await this.setState({ reset: false });
            },
        });
    }

    async coinToss() {
        await this.setState({ coinToss: "..." });
        setTimeout(() => {
            this.setState({
                coinToss: Math.round(Math.random()) ? "Heads" : "Tails",
            });
        }, Math.random() * 1000 + 500);
    }

    handlePaused() {
        this.props.togglePaused();
    }

    render() {
        return (
            <ImageBackground source={gameBackgroundImg} style={styles.background}>
                <View style={styles.container}>
                    {this.state.reset ? null : <Timer />}
                    <Button style={{ backgroundColor: this.props.gamePaused ? "#388E3C" : "#B31A1A" }} onPress={this.handlePaused}>
                        {this.props.gamePauseText}
                    </Button>
                    {!this.props.showCoinToss ? null : (
                        <Button style={{ backgroundColor: "#7059BD" }} onPress={this.coinToss}>
                            {this.state.coinToss}
                        </Button>
                    )}
                </View>
            </ImageBackground>
        );
    }
}
