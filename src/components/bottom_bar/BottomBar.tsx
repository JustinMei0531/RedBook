import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image
} from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";

import iconTabPublish from "../../../assets/images/icon_tab_publish.png";

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const { routes, index } = state;

  return (
    <View style={styles.tabBarContainer}>
      {routes.map((route, idx) => {
        const { options } = descriptors[route.key];
        const label = options.title ?? route.name;
        const isFocused = index === idx;

        if (idx === 2){
            return (
                <TouchableOpacity
                    key={route.key}
                    style={styles.tabItem}
                    onPress={() => {
                        ImagePicker.launchImageLibraryAsync({
                            mediaTypes: ImagePicker.MediaTypeOptions.Images,
                            allowsEditing: false,
                            quality: 1,
                            selectionLimit: 10,
                            allowsMultipleSelection: true,
                            base64: true
                        }).then(data => {
                            console.log(data);
                            return;
                        }).catch(error => {
                            console.error(error);
                            return;
                        });
                    }}
                >
                    <Image 
                        source={iconTabPublish}
                        style={styles.iconPublish}
                    />
                </TouchableOpacity>
            );
        }

        return (
          <TouchableOpacity
            style={styles.tabItem}
            key={route.key}
            onPress={() => {
              navigation.navigate(route.name);
            }}
          >
            <Text
              style={{
                fontSize: isFocused ? 18 : 16,
                color: isFocused ? "#333333" : "#999999",
                fontWeight: isFocused ? "bold" : "normal",
                textAlign: "center", // Ensure text is centered
              }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({
  tabBarContainer: {
    width: "100%",
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "white",
  },
  tabItem: {
    height: "100%",
    flex: 1,
    justifyContent: "center", // Center content vertically
    alignItems: "center",     // Center content horizontally
  },
  iconPublish: {
    width: 58,
    height: 42,
    resizeMode: "contain"
  },
});
