import React, { forwardRef, useImperativeHandle, useState, useCallback } from "react";
import { 
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Modal,
    View,
    ScrollView,
    Dimensions

} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { BarBottomItem } from "./types";

import iconSetting from "../../../assets/images/icon_setting.png";
import iconService from "../../../assets/images/icon_service.png";
import iconScan from "../../../assets/images/icon_scan.png";
import iconFindUser from "../../../assets/images/icon_find_user.png";
import iconDraft from "../../../assets/images/icon_draft.png";
import iconCreateCenter from "../../../assets/images/icon_create_center.png";
import iconBrowseHistory from "../../../assets/images/icon_browse_history.png";
import iconPackrt from "../../../assets/images/icon_packet.png";
import iconFeeeNet from "../../../assets/images/icon_free_net.png";
import iconNiceGoods from "../../../assets/images/icon_nice_goods.png";
import iconOrders from "../../../assets/images/icon_orders.png";
import iconShopCar from "../../../assets/images/icon_shop_car.png";
import iconCoupon from "../../../assets/images/icon_coupon.png";
import iconwish from "../../../assets/images/icon_wish.png";
import iconRedVip from "../../../assets/images/icon_red_vip.png";
import iconCommunity from "../../../assets/images/icon_community.png";
import iconExit from "../../../assets/images/icon_exit.png";
import { remove } from "../../utils/Storage";



const BOTTOM_MENUS: BarBottomItem[] = [
    {icon: iconSetting, text: "Setting"},
    {icon: iconService, text: "Helps"},
    {icon: iconScan, text: "Scan"}
];

const MENUS: BarBottomItem[][] = [
    [
        {icon: iconFindUser, text: "Find Friends"}
    ],
    [
        {icon: iconDraft, text: "My Drafts"},
        {icon: iconCreateCenter, text: "Create Center"},
        {icon: iconBrowseHistory, text: "History"},
        {icon: iconPackrt, text: "Wallet"},
        {icon: iconFeeeNet, text: "Free Data"},
        {icon: iconNiceGoods, text: "Good Items"},
    ],
    [
        {icon: iconOrders, text: "Orders"},
        {icon: iconShopCar, text: "Cart"},
        {icon: iconCoupon, text: "Coupon"},
        {icon: iconwish, text: "Wishlist"},
        {icon: iconRedVip, text: "VIP"},
    ],
    [
        {icon: iconCommunity, text: "Community"},
        {icon: iconExit, text: "Logout"}
    ]
];

const {width: screenWidth} = Dimensions.get("window");


const SideBar = forwardRef((props: any, ref) => {
    const [visible, setVisible] = useState<boolean>(false);
    
    const show = () => {
        setVisible(true);
    };
    const hide = () => {
        setVisible(false);
        return;
    };

    const navigation = useNavigation<StackNavigationProp<any>>();

    const onMenuItemPress = useCallback((item: BarBottomItem) => {
        if (item.text === "Logout"){
            hide();
            remove("userInfo");
            navigation.reset({
                index: 0,
                routes: [{name: "login"}]
            });
        }
    }, []);
    
    useImperativeHandle(ref, () => {
        return {show, hide};
    });

    const renderContent = () => {
        const contentStyle = StyleSheet.create({
            content: {
                height: "100%",
                width: "75%",
                backgroundColor: "white"
            },
            scrollView: {
                width: "100%",
                flex: 1
            },
            bottomLayout: {
                width: "100%",
                flexDirection: "row",
                paddingTop: 12,
                paddingBottom: 20
            },
            bottomMenuItem: {
                flex: 1,
                alignItems: "center"
            },
            bottomMenuIcon: {
                width: 26,
                height: 26
            },
            bottomMenuText: {
                fontSize: 12,
                color: "#666666",
                marginTop: 8
            },
            imageWrap: {
                width: 44,
                height: 44,
                backgroundColor: "#F0F0F0",
                borderRadius: 22,
                justifyContent: "center",
                alignItems: "center"
            },
            menuGroup:{

            },
            divider: {
                width: "100%",
                height: 1,
                backgroundColor: "#FFF"
            },
            menuItem: {
                width: "100%",
                height: 64,
                flexDirection: "row",
                alignItems: "center"
            },
            menuItemIcon: {
                width: 32,
                height: 32,
                resizeMode: "contain"
            },
            menuItemText: {
                fontSize: 16,
                color: "#333333",
                marginLeft: 12
            },
        });

        return (
            <View style={contentStyle.content}>
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.container}
                    style={contentStyle.scrollView}>
                    {
                        MENUS.map((item: BarBottomItem[], index: number) => {

                            return (
                                <View key={index} style={contentStyle.menuGroup}>
                                    {
                                        item.map((subItem: BarBottomItem, index: number) => {
                                            return (
                                                <TouchableOpacity
                                                    onPress={() => {onMenuItemPress(subItem);}} 
                                                    key={index + 1000} 
                                                    style={contentStyle.menuItem}>
                                                    <Image source={subItem.icon} style={contentStyle.menuItemIcon}/>
                                                    <Text style={contentStyle.menuItemText}>{subItem.text}</Text>
                                                </TouchableOpacity>
                                            );
                                        })
                                    }
                                    <View style={contentStyle.divider}/>
                                </View>
                            );
                        })
                    }
                </ScrollView>
                <View style={contentStyle.bottomLayout}>
                    {BOTTOM_MENUS.map((item: BarBottomItem, index: number) => {

                        return (
                            <TouchableOpacity key={item.text} style={contentStyle.bottomMenuItem}>
                                <View style={contentStyle.imageWrap}>
                                <Image source={item.icon} style={contentStyle.bottomMenuIcon}/>
                                </View>
                                <Text style={contentStyle.bottomMenuText}>{item.text}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>
        );
    };

    return (
        <Modal
            transparent={true}
            visible={visible}
            statusBarTranslucent={true}
            animationType="fade"
            onRequestClose={hide}
        >
            <TouchableOpacity 
                onPress={hide}
                activeOpacity={1.0}
                style={styles.root}>
                {renderContent()}
            </TouchableOpacity>

        </Modal>
    );
    
});

const styles = StyleSheet.create({
    root: {
        width: "100%",
        height: "100%",
        backgroundColor: "#000000C0",
        flexDirection: "row"
    },
    container: {
        paddingTop: 72,
        paddingHorizontal: 28,
        paddingBottom: 12
    },
});


export default SideBar;