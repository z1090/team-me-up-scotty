import React from "react";
import { StatusBar } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Provider } from "react-redux";

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
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: "#4F9F4F",
            },
            headerTintColor: "#FFF",
        },
    }
);

const Navigation = createAppContainer(rootNav);

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Navigation />
            </Provider>
        );
    }
}
