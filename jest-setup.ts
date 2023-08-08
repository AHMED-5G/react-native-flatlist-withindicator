require('react-native-reanimated').setUpTests();
import '@testing-library/jest-native/extend-expect';
import { ViewStyle } from 'react-native';

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveAnimatedStyle(
        style: Record<string, unknown>[] | Record<string, unknown> | ViewStyle,
        config?: {
          shouldMatchAllProps?: boolean;
        }
      ): R;
    }
  }
}
