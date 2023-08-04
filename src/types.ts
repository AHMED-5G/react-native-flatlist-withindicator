import type {
  ColorValue,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ViewStyle,
} from 'react-native';
import type { FlatListProps } from 'react-native';

interface CustomFlatListInterface<ItemT = any>
  extends Omit<
    FlatListProps<ItemT>,
    'horizontal' | 'showsHorizontalScrollIndicator' | 'onScroll'
  > {}

export interface ReactNativeFlatListWithIndicatorInterface<ItemT = any>
  extends CustomFlatListInterface<ItemT> {
  data: Array<ItemT>;
  cardWidthPlusMarginValue: number;
  animationScaleFactor?: number;
  containerStyle?: ViewStyle;
  indicatorContainerStyle?: ViewStyle;
  customsIndicatorStyle?: ViewStyle;
  isRTL?: boolean;
  passOnScrollEvent?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

export interface ActiveInactiveIndicatorColorInterface {
  activeIndicatorColor: ColorValue;
  inActiveIndicatorColor: ColorValue;
}
