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

interface FlatListWithIndicatorInterface<ItemT = any>
  extends Omit<FlatListProps<ItemT>, 'horizontal'> {
  activeIndicatorColor: string | number;
  inActiveIndicatorColor: string | number;
  data: Array<ItemT>;
  cardWidthPlusMarginValue: number;
  activeIndicatorWidth?: number;
  inactiveIndicatorWidth?: number;
  animationScaleFactor?: number;
  containerStyle?: ViewStyle;
  indicatorContainerStyle?: ViewStyle;
  customsIndicatorStyle?: ViewStyle;
}

const FlatListWithIndicator = ({
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
  ...props
}: FlatListWithIndicatorInterface<any>) => {
  const scrollXProgress = useSharedValue(0);

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
        [activeIndicatorColor, inActiveIndicatorColor]
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
          inActiveIndicatorColor,
          activeIndicatorColor,
          inActiveIndicatorColor,
        ]),
      };
    });
    return medIndicatorRStyle;
  }

  const handler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollXProgress.value = event.contentOffset.x;
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

export { FlatListWithIndicator };

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
