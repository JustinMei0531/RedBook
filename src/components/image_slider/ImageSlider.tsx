import React, {useState, useEffect, useRef} from "react";
import {
    View,
    FlatList,
    Image,
    StyleSheet,
    Dimensions,
    ViewToken,
    TouchableOpacity
} from "react-native";
import {ImageSliderProps} from "./types";

const { width: screenWidth } = Dimensions.get("window");

export default (props: ImageSliderProps) => {
    const {
        images,
        imageWidth = screenWidth,
        style = {},
        dotStyle = {},
        activeDotStyle = {}
    } = props;
    const [height, setImageHeight] = useState<number>(200);

    useEffect(() => {
        const firstImage = images[0];
        console.log(images);
    Image.getSize(firstImage, (width: number, height: number) => {
        const showHeight = screenWidth * height / width;
        setImageHeight(showHeight);
        });
    }, [images]);

    const [activeIndex, setActiveIndex] = useState<number>(0);
    const flatListRef = useRef<FlatList<any>>(null);



    const onViewableItemsChanged = useRef(
        ({ viewableItems }: { viewableItems: ViewToken[] }) => {
            if (viewableItems.length > 0) {
                setActiveIndex(viewableItems[0].index ?? 0);
            }
        }
    );
    const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 });

    const renderItem = ({ item }: { item: string }) => (
        <Image
            source={{ uri: item }}
            style={{ width: imageWidth, height: height}}
            resizeMode="cover"
        />
    );

    return (
        <View style={[styles.container, style]}>
            <FlatList
                ref={flatListRef}
                data={images}
                renderItem={renderItem}
                keyExtractor={(_, index) => index.toString()}
                horizontal={true}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={onViewableItemsChanged.current}
                viewabilityConfig={viewabilityConfig.current}
                extraData={imageWidth}
            />
            <View style={styles.indicatorContainer}>
                {images.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.indicator,
                            dotStyle,
                            activeIndex === index && [styles.activeIndicator, activeDotStyle],
                        ]}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    indicatorContainer: {
        position: 'absolute',
        bottom: 10,
        flexDirection: 'row',
        alignSelf: 'center',
    },
    indicator: {
        height: 4,
        width: 4,
        borderRadius: 2,
        backgroundColor: '#cccccc',
        margin: 3,
    },
    activeIndicator: {
        backgroundColor: '#ffffff',
    },
});
