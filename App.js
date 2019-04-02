import React from "react";
import { StatusBar } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Provider } from "react-redux";
import { AppLoading } from "expo";
import cacheAssetsAsync from "./utilities/cacheAssetsAsync";

import InputScreen from "./screens/InputScreen";
import TeamsScreen from "./screens/TeamsScreen";

import store from "./data/store";

StatusBar.setBarStyle("light-content");

const rootNav = createStackNavigator(
    {
        Input: InputScreen,
        Teams: TeamsScreen,
    },
    {
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

const Navigation = createAppContainer(rootNav);

export default class App extends React.Component {
    state = {
        appIsReady: false,
    };

    componentWillMount() {
        this._loadAssetsAsync();
    }

    async _loadAssetsAsync() {
        try {
            await cacheAssetsAsync({
                // images: [require('./assets/images/expo-wordmark.png')],
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
                <Provider store={store}>
                    <Navigation />
                </Provider>
            );
        } else {
            return <AppLoading />;
        }
    }
}
