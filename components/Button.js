import React from "react";
import { TouchableHighlight, Text, View, StyleSheet } from "react-native";

const Button = ({ children, onPress, btnID, title }) => (
    <View>
        <TouchableHighlight style={styles.btn} underlayColor={"#1B5E20"} onPress={() => onPress(btnID, title)}>
            <Text style={styles.btnText}>{children}</Text>
        </TouchableHighlight>
    </View>
);

const styles = StyleSheet.create({
    btn: {
        alignItems: "center",
        justifyContent: "center",
        width: 200,
        height: 50,
        borderRadius: 8,
        backgroundColor: "#388E3C",
        marginBottom: 10,
    },
    btnText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#FFF",
    },
});

export default Button;
