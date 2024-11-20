import React, { useEffect, useState, useRef } from "react";
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
import ProfileStore from "../../stores/ProfileStore";
import SideBar from "../../components/sidebar/SideBar";
import { SideBarRef } from "../../components/sidebar/types";
import { load } from "../../utils/Storage";

import { UserInfo } from "../../stores/types";
import Empty from "../../components/empty/Empty";


const Profile = () => {

    const [userInfo, setUserInfo] = useState<UserInfo>({} as UserInfo);
    const [tabIndex, setTabIndex] = useState<number>(0);
    const store = useLocalObservable(() => new ProfileStore());

    const sideBarRef = useRef<SideBarRef>(null);

    const switchTabIndex = (index: number) => {
        setTabIndex(index);
        return;
    };

    useEffect(() => {
        // Load user data from local storage
        load("userInfo").then((data: string | null | undefined) => {
            if (data){
                setUserInfo(JSON.parse(data));
            }

        })
        .catch(error => console.error(error));

        store.requestProfileInfo();

        const {noteList} = store;
        console.log(noteList);
        
    }, []);

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
                <TouchableOpacity
                    onPress={() => {
                        sideBarRef.current?.show();
                    }} 
                    style={titleStyle.menuButton}>
                    <Image style={titleStyle.menuImage} source={iconMenu} />
                </TouchableOpacity>
                <View style={{flex: 1}}/>
                <Image style={[titleStyle.menuImage, titleStyle.rightMenuImage]} source={iconShopCar}/>
                <Image style={[titleStyle.menuImage, titleStyle.rightMenuImage]} source={iconShare}/>
            </View>
        );


    };

    const renderInfo = () => {
        const { avatar, nickName, redBookId, desc, sex } = userInfo;
        const { info } = store;
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
                height: 28,
                marginLeft: -28,
                marginBottom: 2
            },
            nameLayout: {
                marginLeft: 20
            },
            nameText: {
                fontSize: 22,
                color: "white",
                fontWeight: "bold"
            },
            idLayout: {
                flexDirection: "row",
                alignItems: "center",
                marginTop: 16,
                marginBottom: 16
            },
            qrcodeImage: {
                width: 12,
                height: 12,
                marginLeft: 6,
                tintColor: "#BBBBBB"
            },
            idText: {
                fontSize: 12,
                color: "#BBBBBB",
            },
            descText: {
                fontSize: 14,
                color: "white",
                paddingHorizontal: 16
            },
            genderLayout: {
                width: 32,
                height: 24,
                paddingHorizontal: 16,
                backgroundColor: "#FFFFFF50",
                borderRadius: 12,
                marginLeft: 16,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 8
            },
            genderImage: {
                width: 12,
                height: 12,
                resizeMode: "contain"
            },
            infoLayout: {
                width: "100%",
                paddingRight: 16,
                flexDirection: "row",
                alignItems: "center",
                marginTop: 20,
                marginBottom: 36,
            },
            infoItem: {
                alignItems: "center",
                paddingHorizontal: 16
            },
            infoValue: {
                fontSize: 18,
                color: "white"
            },
            infoLabel: {
                fontSize: 12,
                color: "#BBBBBB",
                paddingTop: 6,
            },
            infoButton: {
                height: 32,
                paddingHorizontal: 16,
                borderWidth: 1,
                borderColor: "white",
                borderRadius: 16, 
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 16
            },
            settingImage: {
                width: 16,
                height: 16,
                tintColor: "#FFFFFFc0"
            },
            editText: {
                fontSize: 14,
                color: "#FFFFFFc0",
            },


        });
        return (
            <View>
                <View style={infoStyle.avatarLayout}>
                <Image style={infoStyle.avatarImage} source={{uri: avatar}}/>
                <Image style={infoStyle.addImage} source={iconAdd}/>
                <View style={infoStyle.nameLayout}>
                    <Text style={infoStyle.nameText}>{nickName}</Text>
                    <View style={infoStyle.idLayout}>
                        <Text style={infoStyle.idText}>ID: {redBookId}</Text>
                        <Image style={infoStyle.qrcodeImage} source={iconQRCode}/>
                    </View>
                    
                </View>
                
            </View>
            <Text style={infoStyle.descText}>{desc}</Text>
            <View style={infoStyle.genderLayout}>
                <Image style={infoStyle.genderImage}  source={sex === "male" ? iconMale : iconFemale}/>
            </View>
            <View style={infoStyle.infoLayout}>
                <View style={infoStyle.infoItem}>
                    <Text style={infoStyle.infoValue}>{info.followCount}</Text>
                    <Text style={infoStyle.infoLabel}>Followers</Text>
                    
                </View>
                <View style={infoStyle.infoItem}>
                    <Text style={infoStyle.infoValue}>{info.fans}</Text>
                    <Text style={infoStyle.infoLabel}>Fans</Text>
                    
                </View>
                <View style={infoStyle.infoItem}>
                    <Text style={infoStyle.infoValue}>{info.favorateCount}</Text>
                    <Text style={infoStyle.infoLabel}>Likes</Text>
                    
                </View>
                <View style={{flex: 1}}/>
                <TouchableOpacity style={infoStyle.infoButton}>
                    <Text style={infoStyle.editText}>Edit profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={infoStyle.infoButton}>
                    <Image style={infoStyle.settingImage} source={iconSettings}/>
                </TouchableOpacity>
            </View>
            </View>
        );
    };

    const renderTabs = () => {

        const tabStyle = StyleSheet.create({
            titleLayout: {
                width: "100%",
                height: 48,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white",
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                borderBottomWidth: 1,
                borderBottomColor: "#EEEEEE"
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
                paddingHorizontal: 14,
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

        return (
            <View style={tabStyle.titleLayout}>
           

            <TouchableOpacity
                activeOpacity={0.8}
                style={tabStyle.tabButton}
                onPress={() => switchTabIndex(0)}>
                <Text style={tabIndex  === 0 ? tabStyle.tabSelected : tabStyle.tabUnSelected}>Notes</Text>
                <View style={tabIndex === 0 ? tabStyle.line : {}}></View>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.8}
                style={tabStyle.tabButton}
                onPress={() => switchTabIndex(1)}>
                <Text style={tabIndex  === 1 ? tabStyle.tabSelected : tabStyle.tabUnSelected}>Collections</Text>
                <View style={tabIndex === 1 ? tabStyle.line : {}}></View>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.8}
                style={tabStyle.tabButton}
                onPress={() => switchTabIndex(2)}>
                <Text style={tabIndex  === 2 ? tabStyle.tabSelected : tabStyle.tabUnSelected}>Favorites</Text>
                <View style={tabIndex === 2 ? tabStyle.line : {}}></View>
            </TouchableOpacity>
            
        </View>
        );
    };

    const renderList = ()=> {
        const { noteList, collectionList, favoriteList } = store;
        const currentList = [noteList, collectionList, favoriteList][tabIndex];
        if (!currentList.length){
            switch (tabIndex){
                case 0:
                    return <Empty icon={iconNoNote} tips="No Notes"/>
                case 1:
                    return <Empty icon={iconNoCollection} tips="No Collections" />
                case 2:
                    return <Empty icon={iconNoFavorite} tips="No Favorites" />
                default:
                    return <Empty icon={iconNoNote} tips="" />
            }
        }
        return (
            <View></View>
        );
    };

    return (
        <View style={styles.root}>
            <Image style={styles.bgImage} source={mainBg}/>
            {renderTitle()}
            <ScrollView style={styles.scrollView}>
                {renderInfo()}
                {renderTabs()}
                {renderList()}
            </ScrollView>
            <SideBar ref={sideBarRef}/>
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
