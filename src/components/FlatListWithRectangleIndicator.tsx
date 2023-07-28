import React from 'react';
import type { ViewStyle } from 'react-native';
import type { FlatListProps } from 'react-native';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { I18nManager } from 'react-native';
import { Dimensions } from 'react-native';
import type { ColorValue } from 'react-native';

interface FlatListWithRectangleIndicatorInterface<ItemT = any>
  extends Omit<FlatListProps<ItemT>, 'horizontal'> {
  activeIndicatorColor: ColorValue;
  inActiveIndicatorColor: ColorValue;
  data: Array<ItemT>;
  cardWidthPlusMarginValue: number;
  activeIndicatorWidth?: number;
  inactiveIndicatorWidth?: number;
  animationScaleFactor?: number;
  containerStyle?: ViewStyle;
  indicatorContainerStyle?: ViewStyle;
  customsIndicatorStyle?: ViewStyle;
  isRTL?: boolean;
}

const FlatListWithRectangleIndicator = ({
  activeIndicatorColor,
  inActiveIndicatorColor,
  data,
  cardWidthPlusMarginValue,
  activeIndicatorWidth = 32,
  inactiveIndicatorWidth = 12,
  animationScaleFactor = 1,
  containerStyle,
  indicatorContainerStyle,
  customsIndicatorStyle,
  isRTL = I18nManager.isRTL,
  ...props
}: FlatListWithRectangleIndicatorInterface<any>) => {
  const totalOffsetWidth = data.length * cardWidthPlusMarginValue;

  const width = Dimensions.get('window').width;
  const scrollXProgress = useSharedValue(isRTL ? totalOffsetWidth : 0);

  const firstIndicatorRStyle = useAnimatedStyle(() => {
    return {
      width: interpolate(
        scrollXProgress.value,
        [0, cardWidthPlusMarginValue * animationScaleFactor],
        [activeIndicatorWidth, inactiveIndicatorWidth],
        Extrapolation.CLAMP
      ),

      backgroundColor: interpolateColor(
        scrollXProgress.value,
        [0, cardWidthPlusMarginValue * animationScaleFactor],
        [
          activeIndicatorColor as string | number,
          inActiveIndicatorColor as string | number,
        ]
      ),
    };
  });

  /**
   * Calculates the `medIndicatorRStyle` object based on the provided `index`.
   * The `animationScaleFactor` parameter affects the scaling and animation behavior of the `medIndicatorRStyle`.
   * @param index - The index used in the calculations.
   * @returns The `medIndicatorRStyle` object.
   */
  function MedWithIndex(index: number) {
    const myInput = [
      ((cardWidthPlusMarginValue * index) / 2) * animationScaleFactor,
      cardWidthPlusMarginValue * index * animationScaleFactor,
      cardWidthPlusMarginValue * 2 * index * animationScaleFactor,
    ];
    const medIndicatorRStyle = useAnimatedStyle(() => {
      return {
        width: interpolate(
          scrollXProgress.value,
          myInput,
          [
            inactiveIndicatorWidth,
            activeIndicatorWidth,
            inactiveIndicatorWidth,
          ],
          Extrapolation.CLAMP
        ),
        backgroundColor: interpolateColor(scrollXProgress.value, myInput, [
          inActiveIndicatorColor as string | number,
          activeIndicatorColor as string | number,
          inActiveIndicatorColor as string | number,
        ]),
      };
    });
    return medIndicatorRStyle;
  }

  //   In the context of a FlatList component in React Native, the event.contentOffset.x property represents the horizontal scroll position of the FlatList. The difference between RTL (Right-to-Left) and LTR (Left-to-Right) for event.contentOffset.x depends on the direction in which the FlatList is being scrolled.

  // In a LTR layout, a positive event.contentOffset.x value indicates that the FlatList is being scrolled to the right, while a negative value indicates scrolling to the left. In other words, as you scroll the FlatList to the right, the event.contentOffset.x value increases, and as you scroll to the left, the value decreases.

  // In an RTL layout, the behavior is reversed. A positive event.contentOffset.x value indicates scrolling to the left, while a negative value indicates scrolling to the right. So, as you scroll the FlatList to the left in an RTL layout, the event.contentOffset.x value increases, and as you scroll to the right, the value decreases.

  // It's important to note that the event.contentOffset.x value is relative to the current scroll position. For example, if you have scrolled the FlatList to the right in a LTR layout, the event.contentOffset.x value will be positive, indicating the amount of scroll to the right from the initial position. Similarly, if you have scrolled the FlatList to the left in an RTL layout, the event.contentOffset.x value will be positive, indicating the amount of scroll to the left from the initial position.

  const initialRTLOffsetWidth = totalOffsetWidth - width;
  const handler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const { contentOffset } = event;
      scrollXProgress.value = isRTL
        ? initialRTLOffsetWidth - contentOffset.x
        : contentOffset.x;
    },
  });
  return (
    <View style={[styles.container, containerStyle]}>
      <Animated.FlatList {...props} horizontal data={data} onScroll={handler} />
      <View style={[styles.indicatorContainer, indicatorContainerStyle]}>
        {data.length > 0 &&
          data.map((_, index) => {
            return (
              <Animated.View
                key={index}
                style={[
                  styles.indicatorStyle,
                  index === 0 ? firstIndicatorRStyle : MedWithIndex(index),
                  customsIndicatorStyle,
                ]}
              />
            );
          })}
      </View>
    </View>
  );
};

export { FlatListWithRectangleIndicator };

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  indicatorContainer: { marginTop: 16, flexDirection: 'row' },
  indicatorStyle: {
    borderRadius: 16,
    height: 4,
    margin: 2,
  },
});
