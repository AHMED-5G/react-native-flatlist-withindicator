import type {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ViewStyle,
} from 'react-native';
import type { ColorValue } from 'react-native';
import type { FlatListProps } from 'react-native';

export interface ReactNativeFlatListWithIndicatorInterface<ItemT = any>
  extends Omit<
    FlatListProps<ItemT>,
    'horizontal' | 'showsHorizontalScrollIndicator' | 'onScroll'
  > {
  activeIndicatorColor: ColorValue;
  inActiveIndicatorColor: ColorValue;
  data: Array<ItemT>;
  cardWidthPlusMarginValue: number;
  animationScaleFactor?: number;
  containerStyle?: ViewStyle;
  indicatorContainerStyle?: ViewStyle;
  customsIndicatorStyle?: ViewStyle;
  isRTL?: boolean;
  passOnScrollEvent?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}
