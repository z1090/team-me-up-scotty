import React from "react";
import { View, ImageBackground, TouchableOpacity, FlatList, Modal, TextInput, AsyncStorage } from "react-native";
import { FontAwesome as Icon } from "@expo/vector-icons";

import { BoldText, RegText } from "../../components/typefaces/Montserrat.js";
import Button from "../../components/Button";
import ButtonSmall from "../../components/ButtonSmall";
import HeaderIcon from "../../components/HeaderIcon";
import styles from "./styles";

import { generateTeamName } from "../../utilities/nameGenerator";

import TeamsBackgroundImg from "../../assets/images/teams-background.jpg";

export default class TeamScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "Teams",
            headerRight: (
                <View style={{ flexDirection: "row" }}>
                    <HeaderIcon iconName={"refresh"} onPress={navigation.getParam("_regenerateTeams")} />
                    <HeaderIcon
                        style={{ marginRight: 5, marginLeft: 10 }}
                        iconName={"ellipsis-v"}
                        onPress={navigation.getParam("_goToSettingsModal")}
                    />
                </View>
            ),
        };
    };

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            modalVisible: false,
            currentTeam: 0,
            teams: this.props.teams,
        };
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleEditTeamName = this.handleEditTeamName.bind(this);
        this.handleStartMatchBtn = this.handleStartMatchBtn.bind(this);
        this.renderPlayers = this.renderPlayers.bind(this);
        this.renderTeams = this.renderTeams.bind(this);
        this._goToSettingsModal = this._goToSettingsModal.bind(this);
        this._regenerateTeams = this._regenerateTeams.bind(this);
    }

    componentDidMount() {
        this.props.navigation.setParams({
            _regenerateTeams: this._regenerateTeams,
            _goToSettingsModal: this._goToSettingsModal,
        });
    }
    async _regenerateTeams() {
        await this.props.regenerateTeams(this.state);
        this.setState({ teams: this.props.teams });
    }

    _goToSettingsModal() {
        this.props.navigation.navigate("Settings", { _regenerateTeams: this._regenerateTeams });
    }

    async handleOpenModal(event, i) {
        this.setState({ currentTeam: i });
        await this.setState({ modalVisible: true });
        this.inputIndex.focus();
    }

    handleCloseModal() {
        this.props.saveTeamName(this.state);
        this.setState({ modalVisible: false });
    }

    handleEditTeamName(e, inputType) {
        const { currentTeam, teams } = this.state;
        let editedTeams = [...teams];
        switch (inputType) {
            case "TextInput":
                editedTeams[currentTeam].teamName = e.nativeEvent.text;
                break;
            case "Reset":
                editedTeams[currentTeam].teamName = `Team ${currentTeam + 1}`;
                break;
            case "Random":
                editedTeams[currentTeam].teamName = generateTeamName();
                break;
        }
        this.setState({ teams: editedTeams });
    }

    handleStartMatchBtn() {
        this.props.resetTimer();
        AsyncStorage.multiSet([["teams", JSON.stringify(this.state.teams)]]);

        this.props.navigation.navigate("Game");
    }

    renderTeams({ item, index }) {
        let teamRating = 0;
        item.players.forEach((player) => {
            teamRating += this.props.looseRatings ? player.randomMatchRating : player.enteredRating;
        });

        return (
            <View>
                <View style={styles.teamNameContainer}>
                    <TouchableOpacity style={styles.heading} title="edit" color="#fff" onPress={(event) => this.handleOpenModal(event, index)}>
                        <BoldText style={styles.headingText}>{item.teamName}</BoldText>
                    </TouchableOpacity>
                    <TouchableOpacity title="edit" color="#fff" onPress={(event) => this.handleOpenModal(event, index)}>
                        <Icon style={styles.teamNameIcon} name="pencil" size={16} color="#FFF" />
                    </TouchableOpacity>
                </View>
                <View style={styles.teamNameUnderline} />
                <View style={this.props.ratingsOn ? styles.teamList : [styles.teamList, styles.teamListPadding]}>
                    <FlatList data={item.players} renderItem={this.renderPlayers} keyExtractor={this.keyExtractor} />
                </View>
                {!this.props.ratingsOn ? null : (
                    <View style={[styles.teamRating, styles.teamListPadding]}>
                        <BoldText>Team Rating: {teamRating}</BoldText>
                    </View>
                )}
            </View>
        );
    }

    renderPlayers({ item, index }) {
        let playerNum = String(index + 1).padStart(2, "0");
        return (
            <View style={styles.playerRow}>
                <View style={{ width: 30 }}>
                    <BoldText>{playerNum}</BoldText>
                </View>
                <RegText>{item.name}</RegText>
            </View>
        );
    }

    keyExtractor(item, index) {
        return `${index}`;
    }

    render() {
        const { currentTeam, teams } = this.state;
        return (
            <ImageBackground source={TeamsBackgroundImg} style={styles.background}>
                <View style={styles.container}>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => this.setState({ modalVisible: false })}
                    >
                        <View style={styles.modalOuterContainer}>
                            <View style={styles.modalContainer}>
                                <BoldText style={{ color: "#388E3C" }}>Enter Team Name</BoldText>
                                <TextInput
                                    style={styles.textInput}
                                    ref={(input) => {
                                        this.inputIndex = input;
                                    }}
                                    value={teams[currentTeam].teamName}
                                    onChange={(e) => {
                                        this.handleEditTeamName(e, "TextInput");
                                    }}
                                />
                                <View style={styles.smallBtnRow}>
                                    <ButtonSmall
                                        onPress={(e) => {
                                            this.handleEditTeamName(e, "Reset");
                                        }}
                                    >
                                        Reset
                                    </ButtonSmall>
                                    <ButtonSmall
                                        onPress={(e) => {
                                            this.handleEditTeamName(e, "Random");
                                        }}
                                    >
                                        Random
                                    </ButtonSmall>
                                    <ButtonSmall onPress={this.handleCloseModal}>Close</ButtonSmall>
                                </View>
                            </View>
                        </View>
                    </Modal>
                    <FlatList data={this.state.teams} renderItem={this.renderTeams} keyExtractor={this.keyExtractor} />
                </View>
                <View style={styles.lowerBtnContainer}>
                    <Button onPress={this.handleStartMatchBtn}>Start Match</Button>
                </View>
            </ImageBackground>
        );
    }
}
