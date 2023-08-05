require('react-native-reanimated').setUpTests();
import '@testing-library/jest-native/extend-expect';
import { ReactTestInstance } from 'react-test-renderer';

// declare global {
//   namespace jest {
//     interface Matchers<R> extends Matchers<void, ReactTestInstance> {
//       toHaveAnimatedStyle(
//         style: Record<string, unknown> | Record<string, unknown>[],
//         config?: { shouldMatchAllProps?: boolean }
//       ): R;
//     }
//   }
// }
