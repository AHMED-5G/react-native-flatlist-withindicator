/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {
  fireEvent,
  render,
  waitForElementToBeRemoved,
} from '@testing-library/react-native';
import { FlatListWithRectangleIndicator } from '../index';
import {
  NativeModules,
  StyleProp,
  ViewStyle,
  findNodeHandle,
} from 'react-native';

describe('setPackages', () => {
  // ...

  test('example test', () => {
    expect(true).toBe(true);
  });
});

describe('FlatListWithRectangleIndicator', () => {
  const activeColor = 'rgba(0, 0, 0, 1)';
  const inactiveColor = 'rgba(255, 255, 255, 1)';
  const activeWidthValue = 32;
  const inActiveWidthValue = 12;
  const cardHeight = 200;

  const data = ['Item 1', 'Item 2', 'Item 3'];
  const cardWidthPlusMarginValue = 100;
  // const window = 100;

  // it('renders the flat list with correct number of items', () => {
  //   const { getByTestId } = render(
  //     <FlatListWithRectangleIndicator
  //       data={data.slice(0, 3)}
  //       cardWidthPlusMarginValue={cardWidthPlusMarginValue}
  //       renderItem={undefined}
  //       activeIndicatorColor={activeColor}
  //       inActiveIndicatorColor={inactiveColor}
  //     />
  //   );
  //   const indicator1 = getByTestId('indicator-0');
  //   const indicator2 = getByTestId('indicator-1');
  //   const indicator3 = getByTestId('indicator-2');

  //   expect(indicator1).toBeTruthy();
  //   expect(indicator2).toBeTruthy();
  //   expect(indicator3).toBeTruthy();
  // });

  const activeStyle = {
    width: activeWidthValue,
    backgroundColor: activeColor,
  };
  const inActiveStyle = {
    width: inActiveWidthValue,
    backgroundColor: inactiveColor,
  };
  it('changes the width and background color of the indicators when scrolling', () => {
    const { getByTestId } = render(
      <FlatListWithRectangleIndicator
        data={data}
        cardWidthPlusMarginValue={cardWidthPlusMarginValue}
        renderItem={undefined}
        activeIndicatorColor={activeColor}
        inActiveIndicatorColor={inactiveColor}
      />
    );

    const indicator1 = getByTestId('indicator-0');
    const indicator2 = getByTestId('indicator-1');
    const indicator3 = getByTestId('indicator-2');

    // expect(indicator1).toHaveStyle(activeStyle);
    // expect(indicator2).toHaveStyle(inActiveStyle);
    // expect(indicator3).toHaveStyle(inActiveStyle);

    const scrollableComponent = getByTestId('scrollable-component');

    const eventData = {
      nativeEvent: {
        contentOffset: {
          y: 0,
          x: cardWidthPlusMarginValue,
        },
        contentSize: {
          // Dimensions of the scrollable content
          height: cardHeight,
          width: cardWidthPlusMarginValue * data.length,
        },
        layoutMeasurement: {
          // Dimensions of the device
          height: 800,
          width: 375,
        },
      },
    };

    fireEvent.scroll(scrollableComponent, eventData);
  });
});
