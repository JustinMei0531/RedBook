import React, {useEffect, useState} from "react";
import {Image, Dimensions, StyleSheet} from "react-native";
import {resizableImageProp} from "./types";

const {width: SCREEN_WIDTH} = Dimensions.get("window");
const SHOW_WIDTH = SCREEN_WIDTH - 18 >> 1;

export default ({uri}: resizableImageProp) => {

    const [imageHeight, setImageHeight] = useState<number>(0);

    // Get image height dynamically
    useEffect(() => {
        Image.getSize(uri, (width: number, height: number) => {
            const showHeight = SHOW_WIDTH * height / width;
            setImageHeight(showHeight);
            return;
        });
    }, [uri]);

    const styles = StyleSheet.create({
        root: {
            width: SCREEN_WIDTH - 18 >> 1,
            height: imageHeight,
            resizeMode: "cover"
        },
    });

    return <Image
        style={styles.root}
        source={{uri: uri}}
    />;
};

