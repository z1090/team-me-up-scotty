import React from "react";
import { TouchableHighlight, Text, View, StyleSheet } from "react-native";

const Button = ({ children, onPress, style }) => (
    <View>
        <TouchableHighlight style={[styles.btn, style]} underlayColor={"#1B5E20"} onPress={onPress}>
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
        marginVertical: 20,
    },
    btnText: {
        fontSize: 18,
        color: "#FFF",
        fontFamily: "montserrat-bold",
    },
});

export default Button;
