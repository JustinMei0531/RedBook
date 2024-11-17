import React, {useEffect, useRef, useState} from "react";
import {
    TouchableOpacity,
    StyleSheet,
    Image,
    Animated
} from "react-native";

import iconHeart from "../../../assets/images/icon_heart.png";
import iconHeartEmpty from "../../../assets/images/icon_heart_empty.png";
import {favoriteIconProps} from "./types";

export default ({value, onValueChanged, size=18}: favoriteIconProps) => {

    const [show, setShow] = useState<boolean>(false);

    const scale = useRef<Animated.Value>(new Animated.Value(0)).current;
    const alpha = useRef<Animated.Value>(new Animated.Value(0)).current;

    useEffect(() => {
        setShow(value);
        return;
    }, [value]);

    const iconPressed = () => {
        // Switch selecting state
        const newState = !show;
        setShow(newState);
        onValueChanged?.(newState);

        // Start processing animations
        if (newState){
            alpha.setValue(1);
            const scaleAnimation = Animated.timing(scale, {
                toValue: 1.8,
                duration: 300,
                useNativeDriver: false
            });

            const alphaAnimation = Animated.timing(alpha, {
                toValue: 0,
                duration: 400,
                useNativeDriver: false,
                delay: 200
            });

            // Launch animations
            Animated.parallel([scaleAnimation, alphaAnimation]).start();
        }
        else{
            scale.setValue(0);
            alpha.setValue(0);
        }
    };

    return (
        <TouchableOpacity
            onPress={iconPressed}
        >
            <Image
                style={[styles.container, {width: size, height: size}]}
                source={show ? iconHeart : iconHeartEmpty}
            />

            <Animated.View
                style={{
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    borderWidth: size / 20,
                    position: "absolute",
                    borderColor: "#FF2442",
                    transform: [{scale: scale}],
                    opacity: alpha
                }}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        resizeMode: "contain",
        marginTop: 2
    },
});
