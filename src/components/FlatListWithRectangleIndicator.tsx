import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { I18nManager } from 'react-native';
import type {
  ReactNativeFlatListWithIndicatorInterface,
  ActiveInactiveIndicatorColorInterface,
} from '../types';
import SharedFlatList from './SharedFlatList';

interface FlatListWithRectangleIndicatorInterface
  extends ReactNativeFlatListWithIndicatorInterface,
    ActiveInactiveIndicatorColorInterface {
  activeIndicatorWidth?: number;
  inactiveIndicatorWidth?: number;
}

/**
 * A function that renders a flat list component with rectangular indicators.
 *
 * @param {Array} data - The data to be rendered in the flat list.
 * @param {string} activeIndicatorColor - The color of the active indicator.
 * @param {string} inActiveIndicatorColor - The color of the inactive indicator.
 * @param {number} cardWidthPlusMarginValue - The width of the card plus margin.
 * @param {number} animationScaleFactor - The scaling factor for animation.
 * @param {Object} containerStyle - The style object for the container.
 * @param {Object} indicatorContainerStyle - The style object for the indicator container.
 * @param {Object} customsIndicatorStyle - The style object for the custom indicator.
 * @param {boolean} isRTL - Flag indicating if the layout is right-to-left.
 * @param {function} passOnScrollEvent - Function to pass the scroll event.
 * @param {number} activeIndicatorWidth - The width of the active indicator.
 * @param {number} inactiveIndicatorWidth - The width of the inactive indicator.
 * @param {...any} props - Additional props to be passed to the flat list component.
 * @returns {JSX.Element} The rendered flat list component with rectangular indicators.
 */
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
  passOnScrollEvent,
  ...props
}: FlatListWithRectangleIndicatorInterface): JSX.Element => {
  const totalOffsetWidth = data.length * cardWidthPlusMarginValue;
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
        [activeIndicatorColor, inActiveIndicatorColor] as string[]
      ),
    };
  }, [scrollXProgress]);

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
        ] as string[]),
      };
    });
    return medIndicatorRStyle;
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <SharedFlatList
        {...{
          data,
          cardWidthPlusMarginValue,
          scrollXProgress,
          isRTL,
          passOnScrollEvent,
          ...props,
        }}
      />
      <View
        style={[styles.indicatorContainer, indicatorContainerStyle]}
       
      >
        {data.length > 0 &&
          data.map((_, index) => {
            return (
              <Animated.View
                testID={`indicator-${index}`}
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
