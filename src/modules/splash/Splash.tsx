import React, {useEffect} from "react";
import {
    View,
    Image,
    StyleSheet
} from "react-native";

import {useNavigation} from "@react-navigation/native";


// Logo image of splash screen
import iconLogoMain from "../../../assets/images/icon_main_logo.png";
import {StackNavigationProp} from "@react-navigation/stack";

import { load } from "../../utils/Storage";

export default () => {

    const navigation = useNavigation<StackNavigationProp<any>>();

    useEffect(() => {
        setTimeout(goToLogin, 3000);
    }, []);

    const goToLogin = async() => {
        const cacheUserInfo = await load("userInfo");
        if (cacheUserInfo && JSON.parse(cacheUserInfo)){
            navigation.replace("mainTab");
        }
        else{
            navigation.replace("login");
        }
        return;
    };

    return (
        <View style={styles.root}>
            <Image source={iconLogoMain} style={styles.logoMain}/>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        flexDirection: "column",
        alignItems: "center"
    },

    logoMain: {
        width: 200,
        height: 100,
        marginTop: 300
    },
});
