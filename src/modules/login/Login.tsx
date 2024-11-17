import React, {useState} from "react";
import {Image,
    Linking,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    LayoutAnimation,
    ToastAndroid} from "react-native";

// Logo image of splash screen
import iconLogoMain from "../../../assets/images/icon_main_logo.png";
import iconUnselected from "../../../assets/images/icon_unselected.png";
import iconSelected from "../../../assets/images/icon_selected.png";
import iconArrow from "../../../assets/images/icon_arrow.png";
import iconWxSmall from "../../../assets/images/icon_wx_small.png";
import iconTriangle from "../../../assets/images/icon_triangle.png";
import iconShow from "../../../assets/images/icon_eye_open.png";
import iconHide from "../../../assets/images/icon_eye_close.png";
import iconExchange from "../../../assets/images/icon_exchange.png";
import iconQQ from "../../../assets/images/icon_qq.webp";
import iconWeChat from "../../../assets/images/icon_wx.png";
import iconClose from "../../../assets/images/icon_close_modal.png";



import {LoginType} from "./types";
import UserStore from "../../stores/UserStore";
import { useNavigation } from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";

export default () => {

    const [loginType, setLoginType] = useState<LoginType>(LoginType.QUICK);

    const [check, setCheck] = useState<boolean>(false);

    const [eyeOpen, setEyeOpen] = useState<boolean>(false);

    const [phone, setPhone] = useState<string>("");

    const [pwd, setPwd] = useState<string>("");

    const navigator = useNavigation<StackNavigationProp<any>>();

    const renderQuickLogin = () => {
        const styles = StyleSheet.create({
            root: {
                width: "100%",
                height: "100%",
                flexDirection: "column-reverse",
                alignItems: "center",
                paddingHorizontal: 56
            },

            protocalLayout: {
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 32
            },

            ratioButton: {
                width: 20,
                height: 20,
            },

            labelText: {
                fontSize: 12,
                color: "#999",
                marginLeft: 6
            },
            protocalText: {
                color: "#1020FF",
                fontSize: 12
            },

            otherLoginButton: {
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 20,
                paddingHorizontal: 10,
                marginBottom: 100
            },

            otherLoginText: {
                fontSize: 16,
                color: "#303080"
            },

            iconArrow: {
                width: 16,
                height: 16,
                resizeMode: "contain",
                marginLeft: 2,
                transform: [{rotate: "180deg"}]
            },

            wechatLoginButton: {
                width: "100%",
                height: 56,
                backgroundColor: "#05c160",
                borderRadius: 28,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row"
            },
            iconWx: {
                width: 40,
                height: 40,
                resizeMode: "contain"

            },

            wxLoginText: {
                fontSize: 18,
                color: "white",
                marginLeft: 6
            },

            directLoginButton: {
                width: "100%",
                height: 56,
                backgroundColor: "#FF2442",
                borderRadius: 28,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                marginBottom: 20
            },

            directLoginText: {
                fontSize: 18,
                color: "white"
            },

            logoMain: {
                width: 180,
                height: 95,
                resizeMode: "contain",
                position: "absolute",
                top: 170
            }

        });
        return (
            <View style={styles.root}>
                <View style={styles.protocalLayout}>
                    <TouchableOpacity
                        onPress={() => {
                            setCheck(!check);
                            return;
                        }}
                    >
                        <Image source={check ? iconSelected : iconUnselected}
                               style={styles.ratioButton} />

                    </TouchableOpacity>
                    <Text style={styles.labelText}>I have read and agree </Text>
                    <TouchableOpacity
                        onPress={async () =>  {
                            await Linking.openURL("https:www.google.com");
                            return;
                        }}
                    >
                        <Text style={styles.protocalText}>User Agreement and Privacy Policy</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    onPress={() => {
                        setLoginType((type: LoginType) => {
                            LayoutAnimation.easeInEaseOut();
                            if (type == LoginType.QUICK){
                                return LoginType.INPUT;
                            }
                            return LoginType.QUICK;
                        });
                    }}
                    style={styles.otherLoginButton}>
                    <Text>Other methods to login</Text>
                    <Image style={styles.iconArrow} source={iconArrow}/>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.wechatLoginButton}>
                    <Image source={iconWxSmall} style={styles.iconWx}/>
                    <Text style={styles.wxLoginText}>WeChat Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.directLoginButton}>
                    <Text style={styles.directLoginText}>Login Directly</Text>
                </TouchableOpacity>

                <Image
                    style={styles.logoMain}
                    source={iconLogoMain}
                />
            </View>
        );
    };

    const renderInputLogin = () => {
        const styles = StyleSheet.create({
            root: {
                width: "100%",
                height: "100%",
                flexDirection: "column",
                alignItems: "center",
                paddingHorizontal: 48
            },
            pwdLogin: {
                fontSize: 28,
                color: "#333333",
                fontWeight: "bold",
                marginTop: 72,
            },
            tip: {
                fontSize: 14,
                color: "#bbbbbb",
                marginTop: 6
            },
            phoneLayout: {
                width: "100%",
                height: 64,
                flexDirection: "row",
                alignItems: "center",
                borderBottomWidth: 1,
                borderBottomColor: "#dddddd",
                marginTop: 28
            },

            pre86: {
                fontSize: 24,
                color: "#999999"
            },

            triangle: {
                width: 12,
                height: 6,
                marginLeft: 6,
                resizeMode: "contain"
            },
            phoneInput: {
                flex: 1,
                height: 60,
                backgroundColor: "transparent",
                textAlign: "left",
                textAlignVertical: "center",
                fontSize: 24,
                color: "#333333",
                marginLeft: 16
            },

            pwdLayout: {
                width: "100%",
                height: 64,
                flexDirection: "row",
                alignItems: "center",
                borderBottomWidth: 1,
                borderBottomColor: "#dddddd",
                marginTop: 8
            },

            pwdInput: {
                marginLeft: 0,
                marginRight: 16
            },

            iconEye: {
                width: 30,
                height: 30
            },

            changeLayout: {
                width: "100%",
                marginTop: 10,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between"
            },

            exchangeIcon: {
                width: 16,
                height: 16
            },
            captchaText: {
                color: "#303080",
                flex: 1,
                marginLeft: 4
                // fontSize: 14
            },
            forgetPwdText: {
                fontSize: 14,
                color: "#303080",
            },

            loginButton: {
                width: "100%",
                height: 56,
                backgroundColor: "#ff2442",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 28,
                marginTop: 20,
                marginBottom: 15
            },
            loginButtonDisabled: {
                width: "100%",
                height: 56,
                backgroundColor: "#DDDDDD",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 28,
                marginTop: 20,
                marginBottom: 15
            },

            loginText: {
                fontSize: 20,
                color: "white"
            },

            protocalLayout: {
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 32
            },

            ratioButton: {
                width: 20,
                height: 20,
            },

            labelText: {
                fontSize: 12,
                color: "#999",
                marginLeft: 6
            },
            protocalText: {
                color: "#1020FF",
                fontSize: 12
            },

            wxqqLayout: {
                width: "100%",
                flexDirection: "row",
                marginTop: 100,
                justifyContent: "center"
            },

            iconQQ: {
                width: 56,
                height: 56,
                marginRight: 60
            },
            iconWX: {
                width: 56,
                height: 56,
                marginLeft: 60
            },

            closeButton: {
                position: "absolute",
                left: 36,
                top: 55
            },

            closeImage: {
                width: 28,
                height: 28
            },
        });

        

        // Check whether the user can log in
        const canLogin = phone?.length === 11 && pwd.length >= 6;

        // Login button pressed callback
        const onLoginButtonPressed = () => {
            if (!check){
                ToastAndroid.show("Please agree user aggrement and privacy policy!", ToastAndroid.LONG);
                return;
            }
            if (!canLogin || !check){
                return;
            }
            
            UserStore.requestLogin(phone, pwd, (success: boolean) => {
                if (success){
                    navigator.replace("mainTab");
                }
                else{
                    ToastAndroid.show("Please check your account and password", ToastAndroid.LONG);
                }
            });
            
            
            
        };

        return (
            <View style={styles.root}>
                <Text style={styles.pwdLogin}>Password Login</Text>
                <Text style={styles.tip}>
                    Unregistered mobile phone numbers will be automatically registered after logging in
                </Text>
                <View style={styles.phoneLayout}>
                    <Text style={styles.pre86}>+86</Text>
                    <Image
                        style={styles.triangle}
                        source={iconTriangle}
                    />
                    <TextInput
                        style={styles.phoneInput}
                        placeholderTextColor="#999999"
                        placeholder={"Input phone number"}
                        autoFocus={false}
                        keyboardType="number-pad"
                        maxLength={11}
                        value={phone}
                        onChangeText={(text: string) => {
                            setPhone(text);
                            return;
                        }}
                    />
                </View>
                <View style={styles.pwdLayout}>

                    <TextInput
                        style={[styles.phoneInput, styles.pwdInput]}
                        placeholderTextColor="#999999"
                        placeholder={"Input password"}
                        autoFocus={false}
                        maxLength={18}
                        secureTextEntry={!eyeOpen}
                        value={pwd}
                        onChangeText={(text:string) => {
                            setPwd(text);
                            return;
                        }}
                    />

                    <TouchableOpacity
                        onPress={() => {
                            setEyeOpen(!eyeOpen);
                            return;
                        }}
                        activeOpacity={0.7}
                    >
                        <Image
                            source={eyeOpen ? iconShow : iconHide}
                            style={styles.iconEye}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.changeLayout}>
                    <Image
                        source={iconExchange}
                        style={styles.exchangeIcon}
                    />
                    <Text style={styles.captchaText}>
                        Login via captcha
                    </Text>
                    <Text style={styles.forgetPwdText}>
                        Forget password
                    </Text>
                </View>

                <TouchableOpacity

                    style={canLogin ? styles.loginButton : styles.loginButtonDisabled}
                    activeOpacity={canLogin ? 0.7: 1.0}

                    onPress={onLoginButtonPressed}
                >
                    <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>

                <View style={styles.protocalLayout}>
                    <TouchableOpacity
                        onPress={() => {
                            setCheck(!check);
                            return;
                        }}
                    >
                        <Image source={check ? iconSelected : iconUnselected}
                               style={styles.ratioButton} />

                    </TouchableOpacity>
                    <Text style={styles.labelText}>I have read and agree </Text>
                    <TouchableOpacity
                        onPress={async () =>  {
                            await Linking.openURL("https:www.google.com");
                            return;
                        }}
                    >
                        <Text style={styles.protocalText}>User Agreement and Privacy Policy</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.wxqqLayout}>
                    <Image
                        source={iconQQ}
                        style={styles.iconQQ}
                    />

                    <Image
                        source={iconWeChat}
                        style={styles.iconWX}
                    />

                </View>

                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => {
                        setLoginType(LoginType.QUICK);
                        return;
                    }}
                >
                    <Image style={styles.closeImage} source={iconClose}/>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.root}>
            {
                loginType == LoginType.QUICK ?
                    renderQuickLogin():
                    renderInputLogin()
            }
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        flexDirection: "column",
        alignItems: "center"
    },

});
