import React from "react";
import { 
    View,
    Text,
    StyleSheet
 } from "react-native";


export default () => {

    return (
        <View style={styles.root}>
            <Text style={styles.text}>Home Page</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },

    text: {
        fontSize: 24
    },
});