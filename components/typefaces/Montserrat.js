import React from "react";
import { Text, StyleSheet } from "react-native";

export const BoldText = (props) => (
    <Text {...props} style={[styles.bold, props.style]}>
        {props.children}
    </Text>
);
export const RegText = (props) => (
    <Text {...props} style={[styles.regular, props.style]}>
        {props.children}
    </Text>
);

const styles = StyleSheet.create({
    bold: {
        fontFamily: "montserrat-bold",
        color: "#FFF",
    },
    regular: {
        fontFamily: "montserrat-regular",
        color: "#FFF",
        fontSize: 16,
        lineHeight: 26,
    },
});
