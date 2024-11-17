import React from "react";
import { 
    View,
    Image,
    StyleSheet
    
 } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
const BottomTab = createBottomTabNavigator();

// import all tab pages
import Home from "../home/Home";
import Shop from "../shop/Shop";
import Message from "../message/Message";
import Profile from "../profile/Profile";
import BottomBar from "../../components/bottom_bar/BottomBar";

// Import all tab icons
import iconTabHomeNormal from "../../../assets/images/icon_tab_home_normal.png";
import iconTabHomeSelected from "../../../assets/images/icon_tab_home_selected.png";
import iconTabShopNormal from "../../../assets/images/icon_tab_shop_normal.png";
import iconTabShopSelected from "../../../assets/images/icon_tab_shop_selected.png";
import iconTabMessageNormal from "../../../assets/images/icon_tab_message_normal.png";
import iconTabMessageSelected from "../../../assets/images/icon_tab_message_selected.png";
import iconTabProfileNormal from "../../../assets/images/icon_tab_mine_normal.png";
import iconTabProfileSelected from "../../../assets/images/icon_tab_mine_selected.png";




export default () => {

    return (
        <SafeAreaProvider>
            <BottomTab.Navigator
                // initialRouteName="Home"
                // screenOptions={
                //     ({route}) => {
                        
                //     return {
                //         tabBarActiveTintColor: "#ff2442",
                //         tabBarInactiveTintColor: "#999999",
                //         tabBarIcon: ({focused, color, size}) => {
                //             let image: any;
                //             switch (route.name.toLowerCase()){
                //                 case "home":
                //                     image = focused ? iconTabHomeSelected : iconTabHomeNormal;
                //                     break;
                //                 case "shop":
                //                     image = focused ? iconTabShopSelected : iconTabShopNormal;
                //                     break;
                //                 case "message":
                //                     image = focused ? iconTabMessageSelected : iconTabMessageNormal;
                //                     break;
                //                 case "mine":
                //                     image = focused ? iconTabProfileSelected : iconTabProfileNormal;
                //                     break;
                //                 default:
                //                     break;
                //             }

                //             return <Image source={image} style={{width: size, height: size, tintColor: color}}/>
                //         }
                //     };
                // }}

                tabBar={props => <BottomBar {...props}/>}
                screenOptions={{
                    headerShown: false
                }}
            >
                <BottomTab.Screen 
                    name="Home"
                    component={Home}
                    options={{
                        title: "Home"
                    }}
                />
                <BottomTab.Screen 
                    name="Shop"
                    component={Shop}
                    options={{
                        title: "Shop"
                    }}
                />
                <BottomTab.Screen 
                    name="publish"
                    component={Shop}
                    options={{
                        title: ""
                    }}
                />
                <BottomTab.Screen 
                    name="Message"
                    component={Message}
                    options={{
                        title: "Message"
                    }}
                />
                <BottomTab.Screen 
                    name="Mine"
                    component={Profile}
                    options={{
                        title: "Mine"
                    }}
                />
            </BottomTab.Navigator>
        </SafeAreaProvider>
    );
};


const styles = StyleSheet.create({
    tabIcon: {
        width: 24,
        height: 24,
        tintColor: "gold"
    },
});
