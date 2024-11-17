import React, {useEffect, useState, forwardRef, useImperativeHandle, ForwardedRef, useCallback} from "react";
import {
    Modal,
    Text,
    StyleSheet,
    View,
    StatusBar,
    TouchableOpacity,
    Image,
    Dimensions,
    LayoutAnimation

} from "react-native";
import {CategoryModalRef, homeCategoryModalProps} from "./types";
import iconArrow from "../../../assets/images/icon_arrow.png";
import iconDelete from "../../../assets/images/icon_delete.png";
import {Category} from "../home_category_list/types";
import {save} from "../../utils/Storage";

const{width: SCREEN_WIDTH} = Dimensions.get("window");

export default forwardRef((props: homeCategoryModalProps, ref: ForwardedRef<CategoryModalRef>) => {
    const { categoryList } = props;
    const [visible, setVisible] = useState<boolean>(false);
    const [myList, setMyList] = useState<Category[]>([]);
    const [otherList, setOtherList] = useState<Category[]>([]);

    const [edit, setEdit] = useState<boolean>(false);

    useEffect(() => {
        if (!categoryList){
            return;
        }
        const list1 = categoryList.filter(item => item.isAdd);
        const list2 = categoryList.filter(item => !item.isAdd);
        setMyList(list1);
        setOtherList(list2);
        return;
    }, [categoryList]);

    useImperativeHandle(ref, () => {
        return {
            show, hide
        };
    });

    const show = () => {
        setVisible(true);
        return;
    };

    const hide = () => {
        setVisible(false);
        return;
    };

    const onMyItemPress = useCallback((item: Category, index: number)=> () => {
        if (!edit){
            return;
        }

        const newMyList = myList.filter(i => i.name !== item.name);
        const itemCopy = {...item, isAdd: false};
        const newOtherList = [...otherList, itemCopy];

        LayoutAnimation.easeInEaseOut();

        setMyList(newMyList);
        setOtherList(newOtherList);


    }, [edit, myList, otherList]);

    const onOtherItemPress = useCallback((item: Category, index: number) => () => {
        if (!edit){
            return;
        }
        const itemCopy = {...item, isAdd: true};
        const newOtherList = otherList.filter(i => item.name !== i.name);
        const newMyList = [...myList, itemCopy];

        LayoutAnimation.easeInEaseOut();
        setMyList(newMyList);
        setOtherList(newOtherList);
        return;

    }, [edit, myList, otherList]);

    const renderMyList = () => {

        const myListStyle = StyleSheet.create({
            rowLayout: {
                width: "100%",
                flexDirection: "row",
                alignItems: "center"
            },
            titleText: {
                fontSize: 16,
                color: "#333333",
                fontWeight: "bold",
                marginLeft: 16
            },
            subTitleText: {
                fontSize: 14,
                color: "#999999",
                marginLeft: 12,
                flex: 1
            },
            editButton: {
                paddingHorizontal: 10,
                height: 28,
                backgroundColor: "#f0f0f0",
                borderRadius: 14,
                justifyContent: "center",
                alignItems: "center"
            },
            editText: {
                fontSize: 13,
                color: "#3050FF"
            },
            closeButton: {
                padding: 12
            },
            closeImage: {
                width: 16,
                height: 16,
                resizeMode: "contain",
                transform: [{rotate: "90deg"}]
            },
            listContent: {
                width: "100%",
                flexDirection: "row",
                flexWrap: "wrap"
            },
            itemLayout: {
                width: SCREEN_WIDTH - 80  >> 2,
                height: 32,
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#EEEEEE",
                marginLeft: 16,
                marginTop: 12,
                borderRadius: 6
            },
            itemDefaultLayout: {
                width: SCREEN_WIDTH - 80 >> 2,
                height: 32,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#EEEEEE",

                borderRadius: 6,
                marginLeft: 16,
                marginTop: 12
            },
            itemText: {
              fontSize: 14,
              color: "#666666"
            },
            deleteImage: {
                width: 14,
                height: 14,
                position: "absolute",
                top: -8,
                right: -8,
            },
        });
        return (
            <>
                <View style={myListStyle.rowLayout}>
                    <Text style={myListStyle.titleText}>My channel</Text>
                    <Text style={myListStyle.subTitleText}>Go to my channel</Text>
                    <TouchableOpacity
                        onPress={
                            () => {
                                setEdit((data => {
                                    if (data){
                                        save("categoryList", JSON.stringify([...myList, ...otherList]));
                                        return false;
                                    }
                                    else{
                                        return true;
                                    }
                                }))
                            }
                        }
                        style={myListStyle.editButton}>
                        <Text style={myListStyle.editText}>{edit ? "Finish" : "Edit"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={hide}
                        style={myListStyle.closeButton}>
                        <Image source={iconArrow} style={myListStyle.closeImage}/>
                    </TouchableOpacity>

                </View>
                <View style={myListStyle.listContent}>
                    {
                        myList.map((item: Category, index: number) => {
                            return (
                                <TouchableOpacity
                                    onPress={onMyItemPress(item, index)}
                                    style={item.default ? myListStyle.itemDefaultLayout : myListStyle.itemLayout}
                                    key={`${index}--${item.name}`}>
                                    <Text style={myListStyle.itemText}>{item.name}</Text>
                                    { edit && !item.default && <Image  style={myListStyle.deleteImage} source={iconDelete}/>}
                                </TouchableOpacity>
                            );
                        })
                    }
                </View>
            </>

        );
    };

    const renderOtherList = () => {
        const myListStyle = StyleSheet.create({
            rowLayout: {
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                marginTop: 12
            },
            titleText: {
                fontSize: 16,
                color: "#333333",
                fontWeight: "bold",
                marginLeft: 16
            },
            subTitleText: {
                fontSize: 14,
                color: "#999999",
                marginLeft: 12,
                flex: 1
            },
            editButton: {
                paddingHorizontal: 10,
                height: 28,
                backgroundColor: "#f0f0f0",
                borderRadius: 14,
                justifyContent: "center",
                alignItems: "center"
            },
            editText: {
                fontSize: 13,
                color: "#3050FF"
            },
            closeButton: {
                padding: 12
            },
            closeImage: {
                width: 16,
                height: 16,
                resizeMode: "contain",
                transform: [{rotate: "90deg"}]
            },
            listContent: {
                width: "100%",
                flexDirection: "row",
                flexWrap: "wrap"
            },
            itemLayout: {
                width: (SCREEN_WIDTH - 80)  >> 2,
                height: 32,
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#EEEEEE",
                marginLeft: 16,
                marginTop: 12,
                borderRadius: 6
            },
            itemText: {
                fontSize: 14,
                color: "#666666"
            },
        });
        return (
            <>
                <View style={myListStyle.rowLayout}>
                    <Text style={myListStyle.titleText}>Other channel</Text>
                    <Text style={myListStyle.subTitleText}>Add other channels</Text>
                    {/*<TouchableOpacity style={myListStyle.editButton}>*/}
                    {/*    <Text style={myListStyle.editText}>Edit</Text>*/}
                    {/*</TouchableOpacity>*/}
                    {/*<TouchableOpacity style={myListStyle.closeButton} onPress={hide}>*/}
                    {/*    <Image source={iconArrow} style={myListStyle.closeImage}/>*/}
                    {/*</TouchableOpacity>*/}

                </View>
                <View style={myListStyle.listContent}>
                    {
                        otherList.map((item: Category, index: number) => {
                            return (
                                <TouchableOpacity
                                    onPress={onOtherItemPress(item, index)}
                                    style={myListStyle.itemLayout}
                                    key={`${index}--${item.name}`}>
                                    <Text style={myListStyle.itemText}>+{item.name}</Text>
                                </TouchableOpacity>
                            );
                        })
                    }
                </View>
            </>

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
            <View style={styles.root}>
                <View style={styles.content}>
                    {renderMyList()}
                    {edit && renderOtherList() }
                </View>
                <View style={styles.mask}/>
            </View>
        </Modal>
    );
});

const styles = StyleSheet.create({
    root: {
        width: "100%",
        height: "100%",
        backgroundColor: "transparent",
    },
    content: {
        width: "100%",
        backgroundColor: "white",
        marginTop: 48 + (StatusBar.currentHeight || 0),
        paddingBottom: 40
    },

    mask: {
        width: "100%",
        flex: 1,
        backgroundColor: "#00000040",
    },
});
