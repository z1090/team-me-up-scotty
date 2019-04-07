import React from "react";
import { TouchableHighlight, Text, View, StyleSheet } from "react-native";

const ButtonSmall = ({ children, onPress }) => (
    <View>
        <TouchableHighlight style={styles.btnSmall} underlayColor={"#1B5E20"} onPress={onPress}>
            <Text style={styles.btnSmallText}>{children}</Text>
        </TouchableHighlight>
    </View>
);

const styles = StyleSheet.create({
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
});

export default ButtonSmall;
