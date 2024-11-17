import React, { useState, useEffect } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image,
    StatusBar,
    FlatList,
    Dimensions
 } from "react-native";
import { useLocalObservable } from "mobx-react";

import ShopStore from "../../stores/ShopStore";
import iconSearch from "../../../assets/images/icon_search.png";
import iconCart from "../../../assets/images/icon_shop_car.png";
import iconOrders from "../../../assets/images/icon_orders.png";
import iconMenuMore from "../../../assets/images/icon_menu_more.png";
import { GoodsSimple } from "../../stores/types";

const {width: screenWidth} = Dimensions.get("window");
const itemWidth = screenWidth - 18 >> 1;

export default () => {

    const store = useLocalObservable(() => new ShopStore());

    useEffect(() => {
        store.requestGoodsList();
        store.requestTopCategory();
    }, []);

    const renderTitle = () => {
        const titleStyle = StyleSheet.create({
            titleLayout: {
                width: "auto",
                height: 40,
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 16

            },
            searchLayout: {
                height: 32,
                flex: 1,
                backgroundColor: "#F0F0F0",
                borderRadius: 16,
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 16
            },
            searchIcon: {
                width: 16,
                height: 16
            },
            searchText: {
                fontSize: 12,
                color: "#BBBBBB",
                marginLeft: 6
            },
            menuIcon: {
                width: 22,
                height: 22,
                marginHorizontal: 6
            },
        });
        return (
            <View style={titleStyle.titleLayout}>
                <View style={titleStyle.searchLayout}>
                    <Image style={titleStyle.searchIcon} source={iconSearch}/>
                    <Text style={titleStyle.searchText}>Search items</Text>
                </View>
                <Image source={iconCart} style={titleStyle.menuIcon}/>
                <Image source={iconOrders} style={titleStyle.menuIcon}/>
                <Image source={iconMenuMore} style={titleStyle.menuIcon}/>
            </View>
        );
    };

    const renderItem = ({item, index}: {item: GoodsSimple, index: number}) => {
        const itemStyle = StyleSheet.create({
            item: {
                borderRadius: 8,
                overflow: "hidden",
                width: itemWidth,
                marginLeft: 6,
                marginTop: 6
            },
            itemImage: {
                width: "100%",
                height: 200,
                resizeMode: "cover"
            },
            priceText: {
                fontSize: 14,
                color: "#333333",
                marginTop: 6
            },
            prefix: {
                fontSize: 12,
                color: "#333333",
                fontWeight: "bold"
            },
            price: {
                fontSize: 18,
                color: "#333333",
                fontWeight: "bold"
            },
            originPrice: {
                fontSize: 12,
                color: "#999999",
                fontWeight: "normal"
            },
            originText: {
                fontSize: 12,
                color: "#999999",
                fontWeight: "normal"
            },
        });
        return (
            <View style={itemStyle.item}>
                <Image source={{uri: item.image}} style={itemStyle.itemImage}/>
                <Text style={itemStyle.priceText}>{item.title}</Text>
                <Text style={itemStyle.prefix}>
                    $
                    <Text style={itemStyle.price}>{item.price}   {item.originPrice && <Text style={itemStyle.originPrice}>{item.originPrice}</Text>}</Text>
                </Text>
            </View>
        );
    };

    const ListHeader = () => {

    };

    return (
        <View style={styles.root}>
            {renderTitle()}
            <FlatList 
                style={{flex: 1}}
                data={store.goodsList}
                extraData={store.categoryList}
                renderItem={renderItem}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={<ListHeader />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        width: "100%",
        height: "100%",
        marginTop: StatusBar.currentHeight || 0,
        backgroundColor: "white"
    },

    text: {
        fontSize: 24
    },
});