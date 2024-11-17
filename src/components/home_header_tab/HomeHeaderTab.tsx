import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    Text, TouchableOpacity, Image
} from "react-native";

import iconDaily from "../../../assets/images/icon_daily.png";
import iconSearch from "../../../assets/images/icon_search.png";
import {homeHeaderTabProps} from "./types";


export default ({tab, onTabChanged}: homeHeaderTabProps) => {

    const [tabIndex, setTabIndex] = useState<number>(1);

    useEffect(() => {

    }, [tabIndex]);

    const switchTab = (index: number) => {
        setTabIndex(index);
        onTabChanged?.(index);
        return;
    };

    return (
        <View style={styles.titleLayout}>
            <TouchableOpacity style={styles.dailyButton}>
                <Image style={styles.icon} source={iconDaily}/>
            </TouchableOpacity>

            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.tabButton}
                onPress={() => switchTab(0)}>
                <Text style={tabIndex  === 0 ? styles.tabSelected : styles.tabUnSelected}>focus</Text>
                <View style={tabIndex === 0 ? styles.line : {}}></View>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.tabButton}
                onPress={() => switchTab(1)}>
                <Text style={tabIndex  === 1 ? styles.tabSelected : styles.tabUnSelected}>discovery</Text>
                <View style={tabIndex === 1 ? styles.line : {}}></View>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.tabButton}
                onPress={() => switchTab(2)}>
                <Text style={tabIndex  === 2 ? styles.tabSelected : styles.tabUnSelected}>focus</Text>
                <View style={tabIndex === 2 ? styles.line : {}}></View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.searchButton}>
                <Image style={styles.icon} source={iconSearch}/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    titleLayout: {
        width: "100%",
        height: 48,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        paddingHorizontal: 16
    },

    icon: {
        width: 26,
        height: 26
    },
    dailyButton: {
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingRight: 12
    },
    searchButton: {
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 12
    },

    line: {
        width: 28,
        height: 2,
        backgroundColor: "#FF2442",
        borderRadius: 1,
        position: "absolute",
        bottom: 6
    },
    tabButton: {
        flex: 1,
        flexDirection: "column",
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    tabUnSelected: {
        fontSize: 16,
        color: "#999999"
    },
    tabSelected: {
        fontSize: 17,
        color: "#333333"
    }
});
