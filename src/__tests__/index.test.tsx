import { render } from '@testing-library/react-native';
import { FlatListWithRectangleIndicator } from '../index';
import React from 'react';
// import {describe, expect, test} from '@jest/globals';

function sum(num1: number, num2: number) {
  return num1 + num2;
}

describe('sum module', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
});
it.todo('write a test');

describe('FlatListWithIndicator', () => {
  const data = [{ id: 1 }, { id: 2 }, { id: 3 }];
  const cardWidthPlusMarginValue = 100;
  const activeIndicatorColor = 'green';
  const inActiveIndicatorColor = 'red';

  it('renders without crashing', () => {
    render(
      <FlatListWithRectangleIndicator
        renderItem={undefined}
        activeIndicatorColor={activeIndicatorColor}
        inActiveIndicatorColor={inActiveIndicatorColor}
        data={data}
        cardWidthPlusMarginValue={cardWidthPlusMarginValue}
      />
    );
  });
});

//   it('renders the correct number of indicators', () => {
//     const { getAllByTestId } = render(
//       <FlatListWithRectangleIndicator
//         renderItem={undefined}
//         activeIndicatorColor={activeIndicatorColor}
//         inActiveIndicatorColor={inActiveIndicatorColor}
//         data={data}
//         cardWidthPlusMarginValue={cardWidthPlusMarginValue}
//       />
//     );

//     const indicators = getAllByTestId('indicator');
//     expect(indicators.length).toBe(data.length);
//   });

//   it('updates the scrollXProgress value on scroll', () => {
//     const { getByTestId } = render(
//       <FlatListWithRectangleIndicator
//         activeIndicatorColor={activeIndicatorColor}
//         inActiveIndicatorColor={inActiveIndicatorColor}
//         data={data}
//         cardWidthPlusMarginValue={cardWidthPlusMarginValue}
//         renderItem={undefined}
//       />
//     );

//     const flatList = getByTestId('flat-list');
//     fireEvent.scroll(flatList, { nativeEvent: { contentOffset: { x: 100 } } });

//     // Check if the scrollXProgress value has been updated
//     // You can access the scrollXProgress value using the useRef hook or a state variable
//   });
// });
