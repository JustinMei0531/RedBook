import React, {useState, useEffect, Fragment} from "react";
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Image,
    TouchableOpacity,
    ScrollView,
    TextInput,
    KeyboardAvoidingView,
    Platform
} from "react-native";

import {useLocalObservable, observer} from "mobx-react";
import ArticleDetailStore from "../../stores/ArticleDetailStore";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {RouteParams} from "./types";

import iconArrow from "../../../assets/images/icon_arrow.png";
import iconShare from "../../../assets/images/icon_share.png";
import iconDefaultAvatar from "../../../assets/images/icon_default_avatar.png";
import iconCollectionCommon from "../../../assets/images/icon_collection.png";
import iconCollectionSelected from "../../../assets/images/icon_collection_selected.png";
import iconComment from "../../../assets/images/icon_comment.png";
import {StackNavigationProp} from "@react-navigation/stack";
import ImageSlider from "../../components/image_slider/ImageSlider";
import {ArticleComment} from "../../stores/types";
import FavoriteIcon from "../../components/favorite_icon/FavoriteIcon";

export default observer(() => {
    const store = useLocalObservable(() => new ArticleDetailStore());
    const { params } = useRoute<RouteProp<RouteParams>>();
    const navigation = useNavigation<StackNavigationProp<any>>();
    useEffect(() => {

        store.requestArticleDetail(params.id);
        return;
    }, []);

    // Render title section
    const renderTitle = () => {
        const { detail } = store;
        console.log(store.detail);
        const titleStyle = StyleSheet.create({
            titleLayout: {
                width: "100%",
                height: 56,
                flexDirection: "row",
                alignItems: "center"
            },
            backButton: {
                paddingHorizontal: 16,
                height: "100%",
                justifyContent: "center",
            },
            backImage: {
                width: 20,
                height: 20
            },
            avatarImage: {
                width: 40,
                height: 40,
                resizeMode: "cover",
                justifyContent: "center",
                borderRadius: 20
            },
            userName: {
                fontSize: 14,
                flex: 1,
                color: "#333333",
                marginLeft: 16,
                fontWeight: "bold"
            },
            iconFollow: {
                paddingHorizontal: 16,
                height: 30,
                borderRadius: 15,
                borderWidth: 1,
                borderColor: "#FF2442",
                textAlign: "center",
                textAlignVertical: "center",
                fontSize: 12,
                color: "#FF2442",
                alignItems: "center"
            },
            shareImage: {
                width: 24,
                height: 24,
                marginHorizontal: 16
            },

        });
        return store.detail ? (
            <View style={titleStyle.titleLayout}>
                <TouchableOpacity
                    onPress={() => navigation.pop()}
                    style={titleStyle.backButton}>
                    <Image
                        source={iconArrow}
                        style={titleStyle.backImage}/>

                </TouchableOpacity>
                <Image
                    source={detail?.avatatUrl ? {uri: detail.avatatUrl} : iconDefaultAvatar}
                    style={titleStyle.avatarImage}
                />
                <Text style={titleStyle.userName}>{detail?.userName}</Text>
                <Text style={titleStyle.iconFollow}>Follow</Text>
                <Image style={titleStyle.shareImage} source={iconShare}/>
            </View>
        ) : null;
    };

    const renderImages = () => {
        return (
            <View>
                <ImageSlider
                    images={store.detail ? store.detail.images : []}
                />
            </View>
        );
    };

    const renderContent= () => {
        const { detail } = store;
        const tags = detail?.tag.map(i => `#${i}`).join(' ');
        const contentStyle = StyleSheet.create({
            articleTitleText: {
                fontSize: 18,
                color: "#333333",
                fontWeight: "bold",
                paddingHorizontal: 16,
                marginTop: 15
            },
            articleDetail: {
                marginTop: 6,
                fontSize: 14,
                paddingHorizontal: 16,
                color: "#333333",
                lineHeight: 24
            },
            tags: {
                fontSize: 15,
                marginTop: 6,
                color: "#3050A0",
                paddingHorizontal: 16
            },
            timeLocation: {
                fontSize: 12,
                color: "#BBBBBB",
                marginVertical: 16,
                marginLeft: 16
            },
            line: {
                width: "100%",
                marginHorizontal: 16,
                height: StyleSheet.hairlineWidth,
                backgroundColor: "#EEEEEE",
            }
        });

        return (
            <Fragment>
                <Text style={contentStyle.articleTitleText}>{detail?.title}</Text>
                <Text style={contentStyle.articleDetail}>{detail?.desc}</Text>
                <Text style={contentStyle.tags}>{tags}</Text>
                <Text style={contentStyle.timeLocation}>{detail?.dateTime} {detail?.location}</Text>
                <View style={contentStyle.line}/>
            </Fragment>
        );
    };

    const renderComments = () => {
        const { detail } = store;
        let count = 0;
        if (detail?.comments){
            count = detail?.comments.length;
        }
        const commentStyle = StyleSheet.create({
             countText: {
                fontSize: 14,
                 color: "#666666",
                 marginTop: 20,
                 marginLeft: 16
             },
            inputLayout: {
                 width: "100%",
                padding: 16,
                flexDirection: "row",
                alignItems: "center"
            },
            avatarImage: {
                 width: 32,
                height: 32,
                borderRadius: 16,
                resizeMode: "cover"
            },
            commentInput: {
                 flex: 1,
                height: 32,
                borderRadius: 16,
                marginLeft: 12,
                backgroundColor: "F0F0F0",
                fontSize: 14,
                color: "#333333",
                textAlignVertical: "center",
                paddingVertical: 0,
                paddingHorizontal: 12
            },

            commentsContainer: {
                 paddingHorizontal: 16,
                 paddingTop: 16,
                paddingBottom: 32,
            },
            commentItem: {
                 width: "100%",
                flexDirection: "row"
            },
            cAvatar: {
                width: 36,
                height: 36,
                resizeMode: "contain",
                borderRadius: 18
            },
            contentLayout: {
                 flex: 1,
                marginHorizontal: 12,
            },
            nameText: {
                fontSize: 12,
                color: "#999999",
            },
            messageText: {
                fontSize: 14,
                color: "#333333",
                marginTop: 6
            },
            timeLocationText: {
                fontSize: 12,
                color: "#999999"
            },
            fCount: {
                fontSize: 12,
                color: "#666666",
                marginTop: 2,
                marginLeft: 4
            },
            countLayout: {
                alignItems: "center",
            },
            divider: {
                marginLeft: 50,
                marginRight:0,
                height: StyleSheet.hairlineWidth,
                backgroundColor: "#EEEEEE",
                marginVertical: 16
            },
        });

        return (
            <Fragment>
                <Text style={commentStyle.countText}>Total {count} comments</Text>
                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                    style={commentStyle.inputLayout}>
                    <Image
                        style={commentStyle.avatarImage}
                        source={iconDefaultAvatar}
                    />
                    <TextInput
                        style={commentStyle.commentInput}
                        placeholder={"Input your feeling..."}
                        placeholderTextColor={"#BBBBBB"}
                    />
                </KeyboardAvoidingView>
                {!!count && <View style={commentStyle.commentsContainer}>
                    {
                        detail?.comments ? detail?.comments.map((item: ArticleComment, index: number) => {
                            return (
                                <View key={`${index}`}>
                                    <View style={commentStyle.commentItem}>
                                    <Image
                                        style={commentStyle.cAvatar}
                                        source={item.avatarUrl ? {uri: item.avatarUrl} : iconDefaultAvatar}
                                    />
                                    <View style={commentStyle.contentLayout}>
                                        <Text style={commentStyle.nameText}>
                                            {item.userName}
                                        </Text>
                                        <Text style={commentStyle.messageText}>
                                            {item.message}
                                            
                                        </Text>
                                        <Text style={commentStyle.timeLocationText}>
                                            {item.dateTime}  {item.location}
                                        </Text>
                                    </View>

                                    <View>
                                        <FavoriteIcon value={item.isFavorite}/>
                                        <Text style={commentStyle.fCount}>
                                            {item.favoriteCount}
                                        </Text>
                                    </View>
                                </View>
                                <View style={commentStyle.divider}/>
                                </View>
                            );
                        }) : <Text>No comments</Text>

                    }
                </View>
                }
            </Fragment>
        );
    };

    const renderFooter = () => {
        const { detail } = store;

        const footerStyle = StyleSheet.create({
            bottomLayout: {
                width: "100%",
                height: 80,
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 16,
                borderTopWidth: 1,
                borderTopColor: "#EEEEEE"
            },
            bottomCommentInput: {
                height: 40,
                flex: 1,
                backgroundColor: "#F0F0F0",
                borderRadius: 16,
                color: "#333333",
                textAlignVertical: "center",
                paddingHorizontal: 12,
                marginRight: 12

            },
            bottomCount: {
                fontSize: 14,
                color: "#333333",
                fontWeight: "bold",
                marginLeft: 3
            },
            icon: {
                width: 30,
                height: 30,
                resizeMode: "contain",
                marginLeft: 12
            },
        });

        return (
            <View
            style={footerStyle.bottomLayout}>
                <TextInput 
                    style={footerStyle.bottomCommentInput}
                    placeholder="Your thought"
                    placeholderTextColor="#999999"
                />
                <FavoriteIcon value={detail?.isFavorite} size={30}/>
                <Text style={footerStyle.bottomCount}>{detail?.favoriteCount}</Text>
                <Image 
                    style={footerStyle.icon}
                    source={detail?.isCollection ? iconCollectionSelected : iconCollectionCommon}
                />
                <Text style={footerStyle.bottomCount}>{detail?.collectionCount}</Text>
                <Image 
                    style={footerStyle.icon}
                    source={iconComment}
                />
                <Text style={footerStyle.bottomCount}>{detail?.comments?.length || 0}</Text>
            </View>
        );
    };


    return (
        <View style={styles.root}>
            {renderTitle()}
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.scrollView}>
                {renderImages()}
                {renderContent()}
                {renderComments()}
            </ScrollView>
            {renderFooter()}
        </View>
    );
});

const styles = StyleSheet.create({
    root: {
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        marginTop: StatusBar.currentHeight || 0,
        flex: 1
    },
    scrollView: {
        flex: 1,
        backgroundColor: "white"
    },
});
