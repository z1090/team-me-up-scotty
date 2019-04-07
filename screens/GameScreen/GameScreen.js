import React from "react";
import { StyleSheet, Text, View, ImageBackground, TouchableHighlight } from "react-native";

import Timer from "../../components/Timer";
import Button from "../../components/Button";
import HeaderIcon from "../../components/HeaderIcon";

import { HEADER_SIZE } from "../../utilities/isIphoneX";

import BackgroundImg from "../../assets/game-background.jpg";

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
        console.log(this.props.gameTime);
        return (
            <ImageBackground source={BackgroundImg} style={styles.background}>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
        // backgroundColor: "yellow",
        marginTop: HEADER_SIZE + 50,
    },
    innerContainer: {
        // flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: 200,
        backgroundColor: "blue",
    },
    background: {
        width: "100%",
        flex: 1,
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
});
