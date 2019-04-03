import React from "react";
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, FlatList } from "react-native";
import { FontAwesome as Icon } from "@expo/vector-icons";

import { BoldText, RegText } from "../../components/typefaces/Montserrat.js";
import { isIphoneX } from "../../data/isIphoneX";

const HEADER_SIZE = isIphoneX() ? 100 : 60;

import BackgroundImg from "../../assets/teams-background.jpg";

export default class App extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: "Teams",
        headerRight: (
            <TouchableOpacity title="reset" color="#fff" onPress={navigation.getParam("_regenerateTeams")}>
                <Icon style={styles.icon} name="refresh" size={24} color="#FFF" />
            </TouchableOpacity>
        ),
    });

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
        };
        this.renderItem = this.renderItem.bind(this);
        this._regenerateTeams = this._regenerateTeams.bind(this);
    }

    _regenerateTeams() {
        this.props.regenerateTeams();
    }

    componentDidMount() {
        this.props.navigation.setParams({ _regenerateTeams: this._regenerateTeams });
    }

    renderItem({ item, index }) {
        let playerNum = index + 1;
        return (
            <View style={styles.playerRow}>
                <View style={{width: 30}}>
                    <BoldText>{playerNum}</BoldText>
                </View>
                <RegText>{item}</RegText>
            </View>
            )
    }

    keyExtractor(item, index) {
        return `${index}`;
    }
    refreshData() {
        this.setState({ loading: true });
        this.setState({ names: this.props.names, loading: false });

    }

    render() {
        return (
            <ImageBackground source={BackgroundImg} style={styles.background}>
                <View style={styles.container}>
                    <View style={styles.innerContainer}>
                        <BoldText style={styles.heading}>Team 1</BoldText>
                        <FlatList
                                data={this.props.teams.team1}
                                renderItem={this.renderItem}
                                keyExtractor={this.keyExtractor}
                        />
                    </View>
                    <View style={styles.innerContainer}>
                        <BoldText style={styles.heading}>Team 2</BoldText>
                        <FlatList
                                data={this.props.teams.team2}
                                renderItem={this.renderItem}
                                keyExtractor={this.keyExtractor}
                        />
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
    icon: {
        marginRight: 16,
    },
    playerRow: {
        flexDirection: "row",
        // alignItems: "flex-start",
        justifyContent: "flex-start",
    }
});
