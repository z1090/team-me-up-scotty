import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { FontAwesome as Icon } from "@expo/vector-icons";

const HeaderIcon = ({ iconName, onPress, style }) => (
    <View>
        <TouchableOpacity style={style} title="reset" color="#fff" onPress={onPress}>
            <Icon style={styles.icon} name={iconName} size={24} color="#FFF" />
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    icon: {
        marginRight: 20,
    },
});

export default HeaderIcon;
