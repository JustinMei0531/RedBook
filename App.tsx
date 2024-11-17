import { StyleSheet, Text, View} from 'react-native';
import {SafeAreaProvider} from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";

import {StatusBar} from "expo-status-bar";

import Splash from "./src/modules/splash/Splash";
import Login from "./src/modules/login/Login";
import MainTab from './src/modules/main_tab/MainTab';
import ArticleDetail from "./src/modules/article_detail/ArticleDetail";

// Create a root stack for router
const Stack = createStackNavigator();

export default function App() {
  return (
        <SafeAreaProvider >

            <NavigationContainer>
                {/*Designate an initial route*/}
                <Stack.Navigator
                    initialRouteName="splash"
                    screenOptions={{
                        cardStyle: {elevation: 1}
                    }}
                >
                    <Stack.Screen
                        name="splash"
                        component={Splash}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="login"
                        component={Login}
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen
                        name="mainTab"
                        component={MainTab}
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen
                        options={{
                            headerShown: false
                        }}
                        name="ArticleDetail"
                        component={ArticleDetail} />
                </Stack.Navigator>

            </NavigationContainer>
        </SafeAreaProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
