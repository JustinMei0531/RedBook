import {View, Text, StyleSheet} from "react-native";

export default () => {

    return (
       <View style={styles.root}>
           <Text>Oops! Something went wrong.</Text>
       </View>
    );
};

const styles = StyleSheet.create({
    root: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
    },

    text: {
        fontSize: 20
    },
});
