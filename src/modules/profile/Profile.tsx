import React from "react";
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    Image
 } from "react-native";
import { useLocalObservable } from "mobx-react";



import iconMenu from "../../../assets/images/icon_menu.png";
import mainBg from "../../../assets/images/icon_mine_bg.png";
import iconShopCar from "../../../assets/images/icon_shop_car.png";
import iconShare from "../../../assets/images/icon_share.png";
import iconLocationInfo from "../../../assets/images/icon_location_info.png";
import iconQRCode from "../../../assets/images/icon_qrcode.png";
import iconAdd from "../../../assets/images/icon_add.png";
import iconMale from "../../../assets/images/icon_male.png";
import iconFemale from "../../../assets/images/icon_female.png";
import iconSettings from "../../../assets/images/icon_setting.png";
import iconNoNote from "../../../assets/images/icon_no_note.webp";
import iconNoCollection from "../../../assets/images/icon_no_collection.webp";
import iconNoFavorite from "../../../assets/images/icon_no_favorate.webp";
import UserStore from "../../stores/UserStore";


const Profile = () => {

    const { userInfo } = UserStore;

    const renderTitle = () => {
        const titleStyle = StyleSheet.create({
            titleLayout: {
                width: "100%",
                height: 40,
                flexDirection: "row",
                alignItems: "center"
            },
            menuButton: {
                height: "100%",
                paddingHorizontal: 16,
                justifyContent: "center",
            },
            menuImage: {
                width: 24,
                height: 24,
                resizeMode: "contain"
            },
            rightMenuImage: {
                marginHorizontal: 6,
                tintColor: "white"
            },
        });

        return (
            <View style={titleStyle.titleLayout}>
                <TouchableOpacity style={titleStyle.menuButton}>
                    <Image style={titleStyle.menuImage} source={iconMenu} />
                </TouchableOpacity>
                <View style={{flex: 1}}/>
                <Image style={[titleStyle.menuImage, titleStyle.rightMenuImage]} source={iconShopCar}/>
                <Image style={[titleStyle.menuImage, titleStyle.rightMenuImage]} source={iconShare}/>
            </View>
        );


    };

    const renderInfo = () => {
        const { avatar } = userInfo;
        const infoStyle = StyleSheet.create({
            avatarLayout: {
                width: "100%",
                flexDirection: "row",
                alignItems: "flex-end",
                padding: 16
            },
            avatarImage: {
                width: 96,
                height: 96,
                resizeMode: "cover",
                borderRadius: 48,

            },
            addImage: {
                width: 28,
                height: 28
            },
        });
        return (
            <View style={infoStyle.avatarLayout}>
                <Image style={infoStyle.avatarImage} source={{uri: avatar}}/>
                <Image />
            </View>
        );
    };

    return (
        <View style={styles.root}>
            <Image style={styles.bgImage} source={mainBg}/>
            {renderTitle()}
            <ScrollView style={styles.scrollView}>
                {renderInfo()}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        marginTop: StatusBar.currentHeight || 0,
    },

    bgImage: {
        position: "absolute",
        top: 0,
        width: "100%",
        height: 400,
        resizeMode: "cover"
    },
    scrollView: {
        width: "100%",
        flex: 1
    },

});

export default Profile;
