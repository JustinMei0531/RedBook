import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  StatusBar,

} from "react-native";
import {useNavigation} from "@react-navigation/native";
import { useLocalObservable } from "mobx-react-lite";
import { observer } from "mobx-react-lite";
import {MasonryFlashList} from "@shopify/flash-list";
import HomeStore from "../../stores/HomeStore";
import ListFooter from "../../components/list_footer/ListFooter";
import FavoriteIcon from "../../components/favorite_icon/FavoriteIcon";
import HomeHeaderTab from "../../components/home_header_tab/HomeHeaderTab";
import HomeCategoryList from "../../components/home_category_list/HomeCategoryList";
import { ArticleSimple } from "../../stores/types";

import iconHeartFull from "../../../assets/images/icon_heart.png";
import iconHeartEmpty from "../../../assets/images/icon_heart_empty.png";
import ResizableImage from "../../components/resizable_image/ResizableImage";
import {Category} from "../../components/home_category_list/types";
import {StackNavigationProp} from "@react-navigation/stack";

const { width } = Dimensions.get("window");

const HomeComponent = observer(() => {
  const store = useLocalObservable(() => new HomeStore());

  const [tabIndex, setTabIndex] = useState<number>(1);


  const navigation = useNavigation<StackNavigationProp<any>>();

  useEffect(() => {
    store.requestHomeList();
    store.getCategoryList();
  }, []);



  const loadMoreData = () => {
    store.requestHomeList();
    return;
  };

  const onArticlePress = useCallback((item: ArticleSimple) => () => {
      navigation.push("ArticleDetail", {id: item.id});
      return;
  }, []);

  // Render article cards
  const renderItem = ({ item, index }: { item: ArticleSimple; index: number }) => {

    const styles = StyleSheet.create({
      item: {
        width: width - 18 >> 1,
        backgroundColor: "white",
        marginLeft: 6,
        marginBottom: 6,
        borderRadius: 8,
        overflow: "hidden"
      },

      itemImage: {
        width: "100%",
        height: 250,
        resizeMode: "cover"
      },

      itemTitle: {
        fontSize: 14,
        color: "#333333",
        marginHorizontal: 12,
        marginVertical: 4
      },
      nameLayout: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        marginBottom: 10,
        marginTop: 8,
      },
      avatarImage: {
        width: 20,
        height: 20,
        resizeMode: "cover",
        borderRadius: 10
      },
      nameText: {
        fontSize: 12,
        color: "#999999",
        marginLeft: 6,
        flex: 1
      },

      iconHeart: {
        width: 16,
        height: 16,
        resizeMode: "contain",
        marginTop: 2
      },

      likes: {
        fontSize: 14,
        color: "#999999",
        marginLeft: 4
      },
    });


    return (
        <TouchableOpacity
            onPress={onArticlePress(item)}
            style={styles.item}>
          <ResizableImage uri={item.image}/>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <View style={styles.nameLayout}>
            <Image source={{uri: item.avatarUrl}} style={styles.avatarImage} />
            <Text style={styles.nameText}>{item.userName}</Text>
            <FavoriteIcon
                value={item.isFavorite}
                onValueChanged={(value: boolean) => {
                }}
            />
            <Text style={styles.likes}>{item.favoriteCount}</Text>
          </View>
        </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.root}>
      <HomeHeaderTab tab={1}/>
      <MasonryFlashList
          estimatedItemSize={300}
        ListHeaderComponent={<HomeCategoryList categoryList={store.categoryList} onCategoryChange={(category: Category) => {}}/>}
        data={store.homeList}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.container}
        numColumns={2}
        // refreshing={store.refresh}
        // onRefresh={fetchNewData}
        onEndReachedThreshold={0.1}
        onEndReached={loadMoreData}
        ListFooterComponent={() => <ListFooter value="No more data."></ListFooter> }

      />
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: "#f0f0f0"
  },
  flatList: {
    flex: 1,
  },
  container: {
    // paddingTop: 6,
  },
});


export default HomeComponent;
