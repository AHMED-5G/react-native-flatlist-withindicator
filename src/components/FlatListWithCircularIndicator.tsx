import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { I18nManager } from 'react-native';
import type {
  ActiveInactiveIndicatorColorInterface,
  ReactNativeFlatListWithIndicatorInterface,
} from '../types';
import SharedFlatList from './SharedFlatList';
import {
  ACTIVE_INDICATOR_COLOR,
  INACTIVE_INDICATOR_COLOR,
} from 'src/constants';

interface FlatListWithCircularIndicatorInterface
  extends ReactNativeFlatListWithIndicatorInterface,
    Partial<ActiveInactiveIndicatorColorInterface> {
  circleRadius?: number;
}

/**
 * A function that renders a flat list component with circular indicators.
 *
 * @param {Array} data - The data to be rendered in the flat list.
 * @param {string} activeIndicatorColor - The color of the active indicator.
 * @param {string} inActiveIndicatorColor - The color of the inactive indicator.
 * @param {number} circleRadius - The radius of the circular indicators (default value is 10).
 * @param {number} cardWidthPlusMarginValue - The width of the card plus margin.
 * @param {number} animationScaleFactor - The scaling factor for animation (default value is 1).
 * @param {Object} containerStyle - The style object for the container.
 * @param {Object} indicatorContainerStyle - The style object for the indicator container.
 * @param {Object} customsIndicatorStyle - The style object for the custom indicator.
 * @param {boolean} isRTL - Flag indicating if the layout is right-to-left (default value is I18nManager.isRTL).
 * @param {function} passOnScrollEvent - Function to pass the scroll event.
 * @returns {JSX.Element} The rendered flat list component with circular indicators.
 */
/** */
const FlatListWithCircularIndicator = ({
  data,
  activeIndicatorColor = ACTIVE_INDICATOR_COLOR,
  inActiveIndicatorColor = INACTIVE_INDICATOR_COLOR,
  circleRadius = 10,
  cardWidthPlusMarginValue,
  animationScaleFactor = 1,
  containerStyle,
  indicatorContainerStyle,
  customsIndicatorStyle,
  isRTL = I18nManager.isRTL,
  passOnScrollEvent,
  ...props
}: FlatListWithCircularIndicatorInterface): JSX.Element => {
  const totalOffsetWidth = data.length * cardWidthPlusMarginValue;

  const scrollXProgress = useSharedValue(isRTL ? totalOffsetWidth : 0);

  const firstIndicatorRStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        scrollXProgress.value,
        [0, cardWidthPlusMarginValue * animationScaleFactor],
        [activeIndicatorColor, inActiveIndicatorColor] as string[]
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
      <View style={[styles.indicatorContainer, indicatorContainerStyle]}>
        {data.length > 0 &&
          data.map((_, index) => {
            return (
              <Animated.View
                key={index}
                style={[
                  styles.indicatorStyle,
                  {
                    width: circleRadius,
                    height: circleRadius,
                    borderRadius: circleRadius,
                  },
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

export { FlatListWithCircularIndicator };

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  indicatorContainer: { marginTop: 16, flexDirection: 'row' },
  indicatorStyle: {
    margin: 2,
  },
});
