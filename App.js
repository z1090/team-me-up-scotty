import React from "react";
import { StatusBar, AsyncStorage } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Provider } from "react-redux";
import { AppLoading } from "expo";

import cacheAssetsAsync from "./utilities/cacheAssetsAsync";

StatusBar.setBarStyle("light-content");

//================================================================
// Store Initial Setup ===========================================
import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import initialState from "./data/initialState";
import reducer from "./data/reducers";

const reduxDevTools = (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__) || compose;

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const store = createStoreWithMiddleware(reducer, initialState, reduxDevTools());
//================================================================

//================================================================
// Navigation Setup ==============================================
import InputScreen from "./screens/InputScreen";
import TeamsScreen from "./screens/TeamsScreen";
import Settings from "./screens/Settings";
import GameScreen from "./screens/GameScreen";
import StartScreen from "./screens/StartScreen";

const mainNavStack = createStackNavigator(
    {
        Start: StartScreen,
        Input: InputScreen,
        Teams: TeamsScreen,
        Game: GameScreen,
    },
    {
        initialRouteName: "Start",
        headerLayoutPreset: "center",
        defaultNavigationOptions: {
            headerTitleStyle: {
                fontFamily: "montserrat-bold",
                fontWeight: "200",
            },
            headerTransparent: true,
            headerStyle: {
                backgroundColor: "transparent",
                zIndex: 100,
            },
            headerTintColor: "#FFF",
        },
    }
);

const rootNavStack = createStackNavigator(
    {
        Main: {
            screen: mainNavStack,
        },
        Settings: {
            screen: Settings,
        },
    },
    {
        mode: "modal",
        headerMode: "none",
    }
);

const Navigation = createAppContainer(rootNavStack);
//================================================================

export default class App extends React.Component {
    state = {
        appIsReady: false,
        storeInState: store,
    };

    componentWillMount() {
        AsyncStorage.multiGet(["names", "settings", "teams"], (e, results) => {
            if (results[0][1] && results[1][1] && results[2][1]) {
                const loadedState = {
                    names: JSON.parse(results[0][1]),
                    settings: JSON.parse(results[1][1]),
                    teams: JSON.parse(results[2][1]),
                };
                const loadedStore = createStoreWithMiddleware(reducer, loadedState, reduxDevTools());
                this.setState({ storeInState: loadedStore });
            }
        });
        this._loadAssetsAsync();
    }

    async _loadAssetsAsync() {
        try {
            await cacheAssetsAsync({
                fonts: [
                    { "montserrat-bold": require("./assets/fonts/Montserrat_Bold.ttf") },
                    { "montserrat-regular": require("./assets/fonts/Montserrat-Regular.ttf") },
                ],
            });
        } catch (e) {
            console.warn(
                "There was an error caching assets (see: main.js), perhaps due to a " +
                    "network timeout, so we skipped caching. Reload the app to try again."
            );
            console.log(e.message);
        } finally {
            this.setState({ appIsReady: true });
        }
    }

    render() {
        if (this.state.appIsReady) {
            return (
                <Provider store={this.state.storeInState}>
                    <Navigation />
                </Provider>
            );
        } else {
            return <AppLoading />;
        }
    }
}
