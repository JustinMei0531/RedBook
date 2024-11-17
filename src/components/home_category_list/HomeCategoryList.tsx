import React, {useEffect, useId, useRef} from "react";
import {
    Text,
    ScrollView,
    Image,
    View,
    StyleSheet,
    TouchableOpacity
} from "react-native";

import HomeCategoryModal from "../home_category_modal/HomeCategoryModal";
import {CategoryModalRef} from "../home_category_modal/types";

import iconArrow from "../../../assets/images/icon_arrow.png";

import {Category, homeCategoryProps} from "./types";


export default ({categoryList, onCategoryChange}: homeCategoryProps) => {

    const modalRef = useRef<CategoryModalRef>(null);

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView} horizontal={true} showsHorizontalScrollIndicator={false}>
                {
                    categoryList.map((item: Category, index: number) => {
                        return (
                            <TouchableOpacity style={styles.tabItem} key={`${index} -- ${item.name}`}>
                                <Text style={styles.tabItemText}>{item.name}</Text>
                            </TouchableOpacity>
                        );
                    })
                }

            </ScrollView>
            <TouchableOpacity
                style={styles.openButton}
                onPress={() => {
                    modalRef.current?.show();
                    return;
                }}
            >
                <Image style={styles.openImage} source={iconArrow}/>
            </TouchableOpacity>
            <HomeCategoryModal ref={modalRef} categoryList={categoryList}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 36,
        flexDirection: "row",
        backgroundColor: "white",
        marginBottom: 6
    },
    tabItem: {
        flex: 1,
        marginLeft: 5,
        marginRight: 5,
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    tabItemText: {
        fontSize: 16,
        color: "#999999"
    },
    scrollView: {
        flex: 1,
        width: "100%"
    },
    openButton: {
        width: 40,
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
    },

    openImage: {
        width: 18,
        height: 18,
        transform: [{rotate: "-90deg"}]
    },
});
