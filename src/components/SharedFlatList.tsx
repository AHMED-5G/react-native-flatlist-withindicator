import { Dimensions, FlatList, I18nManager } from 'react-native';
import React from 'react';

import { SharedValue } from 'react-native-reanimated';
import { ReactNativeFlatListWithIndicatorInterface } from '../types';

interface SharedFlatListInterface
  extends ReactNativeFlatListWithIndicatorInterface {
  scrollXProgress: SharedValue<number>;
}

const SharedFlatList = ({
  data,
  cardWidthPlusMarginValue,
  scrollXProgress,
  isRTL = I18nManager.isRTL,
  passOnScrollEvent,
  ...props
}: SharedFlatListInterface) => {
  const width = Dimensions.get('window').width;
  const totalOffsetWidth = data.length * cardWidthPlusMarginValue;
  const initialRTLOffsetWidth = totalOffsetWidth - width;

  //   In the context of a FlatList component in React Native, the event.contentOffset.x property represents the horizontal scroll position of the FlatList. The difference between RTL (Right-to-Left) and LTR (Left-to-Right) for event.contentOffset.x depends on the direction in which the FlatList is being scrolled.

  // In a LTR layout, a positive event.contentOffset.x value indicates that the FlatList is being scrolled to the right, while a negative value indicates scrolling to the left. In other words, as you scroll the FlatList to the right, the event.contentOffset.x value increases, and as you scroll to the left, the value decreases.

  // In an RTL layout, the behavior is reversed. A positive event.contentOffset.x value indicates scrolling to the left, while a negative value indicates scrolling to the right. So, as you scroll the FlatList to the left in an RTL layout, the event.contentOffset.x value increases, and as you scroll to the right, the value decreases.

  // It's important to note that the event.contentOffset.x value is relative to the current scroll position. For example, if you have scrolled the FlatList to the right in a LTR layout, the event.contentOffset.x value will be positive, indicating the amount of scroll to the right from the initial position. Similarly, if you have scrolled the FlatList to the left in an RTL layout, the event.contentOffset.x value will be positive, indicating the amount of scroll to the left from the initial position.
  return (
    <FlatList
      testID="scrollable-component"
      {...props}
      horizontal
      data={data}
      onScroll={(e) => {
        passOnScrollEvent?.(e);
        scrollXProgress.value = isRTL
          ? initialRTLOffsetWidth - e.nativeEvent.contentOffset.x
          : e.nativeEvent.contentOffset.x;
      }}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default SharedFlatList;
