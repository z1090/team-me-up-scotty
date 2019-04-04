import React from "react";
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
    TouchableHighlight,
    FlatList,
    ScrollView,
    Modal,
    Button,
    Dimensions,
    TextInput,
} from "react-native";
import { FontAwesome as Icon } from "@expo/vector-icons";

import { BoldText, RegText } from "../../components/typefaces/Montserrat.js";
import { isIphoneX } from "../../data/isIphoneX";
import { generateTeamName } from "../../utilities/nameGenerator";

const HEADER_SIZE = isIphoneX() ? 100 : 60;
const win = Dimensions.get("window");

import BackgroundImg from "../../assets/teams-background.jpg";

export default class App extends React.Component {
    static navigationOptions = ({ navigation }) => {
        // const params = navigation.state.params || {};
        return {
            title: "Teams",
            headerRight: (
                <TouchableOpacity title="reset" color="#fff" onPress={navigation.getParam("_regenerateTeams")}>
                    <Icon style={styles.icon} name="refresh" size={24} color="#FFF" />
                </TouchableOpacity>
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
            coinToss: "Coin Toss",
        };
        this.renderPlayers = this.renderPlayers.bind(this);
        this.renderTeams = this.renderTeams.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.setModalVisible = this.setModalVisible.bind(this);
        this.coinToss = this.coinToss.bind(this);
    }

    componentDidMount() {
        this.props.navigation.setParams({
            _regenerateTeams: async () => {
                await this.props.regenerateTeams(this.state);
                this.setState({ teams: this.props.teams });
            },
        });
    }
    async editTeamName(event, i) {
        this.setState({ currentTeam: i });
        await this.setModalVisible(true);
        this.inputIndex.focus();
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    };

    closeModal() {
        this.props.saveTeamName(this.state);
        this.setModalVisible(false);
    }

    async coinToss() {
        await this.setState({ coinToss: "..." });
        setTimeout(() => {
            this.setState({
                coinToss: Math.round(Math.random()) ? "Heads" : "Tails",
            });
        }, Math.random() * 1000 + 500);
    }

    renderTeams({ item, index }) {
        return (
            <View style={styles.innerContainer}>
                <View style={styles.teamName}>
                    <TouchableOpacity
                        style={styles.heading}
                        title="edit"
                        color="#fff"
                        onPress={(event) => this.editTeamName(event, index)}
                    >
                        <BoldText style={styles.headingText}>{item.teamName}</BoldText>
                    </TouchableOpacity>
                    <TouchableOpacity title="edit" color="#fff" onPress={(event) => this.editTeamName(event, index)}>
                        <Icon style={styles.teamNameIcon} name="pencil" size={16} color="#FFF" />
                    </TouchableOpacity>
                </View>
                <View style={styles.teamNameUnderline} />
                <View style={styles.teamList}>
                    <FlatList data={item.players} renderItem={this.renderPlayers} keyExtractor={this.keyExtractor} />
                </View>
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
                <RegText>{item}</RegText>
            </View>
        );
    }

    keyExtractor(item, index) {
        return `${index}`;
    }

    render() {
        let { currentTeam, teams } = this.state;
        let editedTeams = [...teams];
        return (
            <ImageBackground source={BackgroundImg} style={styles.background}>
                <View style={styles.container}>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => this.setModalVisible(false)}
                    >
                        <View style={styles.modalOuterContainer}>
                            <View style={styles.modalContainer}>
                                <BoldText style={{ color: "#333" }}>Enter Team Name</BoldText>
                                <TextInput
                                    style={styles.textInput}
                                    ref={(input) => {
                                        this.inputIndex = input;
                                    }}
                                    value={teams[currentTeam].teamName}
                                    onChange={(e) => {
                                        editedTeams[currentTeam].teamName = e.nativeEvent.text;
                                        this.setState({ teams: editedTeams });
                                    }}
                                />
                                <View style={styles.btnRow}>
                                    <TouchableHighlight
                                        style={styles.btnSmall}
                                        underlayColor={"#1B5E20"}
                                        onPress={() => {
                                            editedTeams[currentTeam].teamName = `Team ${currentTeam + 1}`;
                                            this.setState({ teams: editedTeams });
                                        }}
                                    >
                                        <Text style={styles.btnSmallText}>Reset</Text>
                                    </TouchableHighlight>
                                    <TouchableHighlight
                                        style={styles.btnSmall}
                                        underlayColor={"#1B5E20"}
                                        onPress={() => {
                                            editedTeams[currentTeam].teamName = generateTeamName();
                                            this.setState({ teams: editedTeams });
                                        }}
                                    >
                                        <Text style={styles.btnSmallText}>Random</Text>
                                    </TouchableHighlight>
                                    <TouchableHighlight
                                        style={styles.btnSmall}
                                        underlayColor={"#1B5E20"}
                                        onPress={this.closeModal}
                                    >
                                        <Text style={styles.btnSmallText}>Close</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </View>
                    </Modal>
                    <FlatList data={this.state.teams} renderItem={this.renderTeams} keyExtractor={this.keyExtractor} />
                </View>
                <View style={styles.btnContainer}>
                    <TouchableHighlight style={styles.btn} underlayColor={"#1B5E20"} onPress={this.coinToss}>
                        <BoldText style={styles.btnText}>{this.state.coinToss}</BoldText>
                    </TouchableHighlight>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginTop: HEADER_SIZE,
    },
    modalOuterContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 150,
        marginBottom: 200,
    },
    innerContainer: {
        // flex: 1,
        marginTop: 20,
    },
    modalContainer: {
        // flex: 1,
        width: "93%",
        height: 140,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        borderRadius: 5,
    },
    background: {
        width: "100%",
        flex: 1,
    },
    heading: {
        flex: 1,
    },
    headingText: {
        fontSize: 20,
    },
    icon: {
        marginRight: 16,
    },
    playerRow: {
        flexDirection: "row",
        // alignItems: "flex-start",
        justifyContent: "flex-start",
    },
    teamName: {
        flexDirection: "row",
        justifyContent: "flex-end",
        width: "100%",
        paddingLeft: 20,
        paddingRight: 15,
        // backgroundColor: "blue",
    },
    teamNameUnderline: {
        marginLeft: 20,
        marginRight: 15,
        marginBottom: 8,
        borderBottomWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.5)",
    },
    teamNameIcon: {
        width: 20,
        marginTop: 5,
        marginLeft: 20,
    },
    teamList: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    textInput: {
        borderColor: "#69B569",
        borderWidth: 1,
        borderRadius: 5,
        height: 35,
        marginTop: 10,
        marginBottom: 10,
        paddingHorizontal: 5,
        fontFamily: "montserrat-regular",
        color: "#000",
    },
    btnRow: {
        marginTop: 5,
        flexDirection: "row",
        justifyContent: "center",
    },
    btnSmall: {
        alignItems: "center",
        justifyContent: "center",
        width: 80,
        height: 30,
        borderRadius: 8,
        backgroundColor: "#388E3C",
        marginHorizontal: 5,
    },
    btnSmallText: {
        fontFamily: "montserrat-bold",
        fontSize: 14,
        color: "#FFF",
    },
    btnContainer: {
        flex: 1,
        // backgroundColor: "rgba(0, 0, 0, 0.1)",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
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
