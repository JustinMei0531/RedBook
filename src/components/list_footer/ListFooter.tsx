import {
    Text,
    View,
    StyleSheet
} from "react-native";

import {listFooterProp} from "./types";

export default (prop: listFooterProp) => {
    const {value} = prop;
    return (
        <View style={styles.footerContainer}>
            <Text style={styles.text}>{value}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    footerContainer: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },

    text: {
        width: "100%",
        fontSize: 14,
        color: "#999999",
        marginVertical: 16,
        textAlign: "center",
        textAlignVertical: "center"
    }
});
