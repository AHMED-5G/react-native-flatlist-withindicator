import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { I18nManager } from 'react-native';
import { Dimensions } from 'react-native';
import { FlatList } from 'react-native';
import type { ReactNativeFlatListWithIndicatorInterface } from 'lib/typescript/types';

interface FlatListWithCircularIndicatorInterface
  extends ReactNativeFlatListWithIndicatorInterface {
  circleRadius?: number;
}

const FlatListWithCircularIndicator = ({
  activeIndicatorColor,
  inActiveIndicatorColor,
  data,
  circleRadius = 10,
  cardWidthPlusMarginValue,
  animationScaleFactor = 1,
  containerStyle,
  indicatorContainerStyle,
  customsIndicatorStyle,
  isRTL = I18nManager.isRTL,
  ...props
}: FlatListWithCircularIndicatorInterface) => {
  const totalOffsetWidth = data.length * cardWidthPlusMarginValue;

  const width = Dimensions.get('window').width;
  const scrollXProgress = useSharedValue(isRTL ? totalOffsetWidth : 0);

  const firstIndicatorRStyle = useAnimatedStyle(() => {
    return {
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
        backgroundColor: interpolateColor(scrollXProgress.value, myInput, [
          inActiveIndicatorColor as string | number,
          activeIndicatorColor as string | number,
          inActiveIndicatorColor as string | number,
        ]),
      };
    });
    return medIndicatorRStyle;
  }

  const initialRTLOffsetWidth = totalOffsetWidth - width;

  return (
    <View style={[styles.container, containerStyle]}>
      <FlatList
        {...props}
        horizontal
        data={data}
        onScroll={(e) => {
          scrollXProgress.value = isRTL
            ? initialRTLOffsetWidth - e.nativeEvent.contentOffset.x
            : e.nativeEvent.contentOffset.x;
        }}
        showsHorizontalScrollIndicator={false}
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
