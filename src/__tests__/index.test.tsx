import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { FlatListWithRectangleIndicator } from '../index';

describe('FlatListWithRectangleIndicator', () => {
  const activeColor = 'rgba(0, 0, 0, 1)';
  const inactiveColor = 'rgba(255, 255, 255, 1)';
  const activeWidthValue = 32;
  const inActiveWidthValue = 12;
  const cardHeight = 200;

  const data = ['Item 1', 'Item 2', 'Item 3'];
  const cardWidthPlusMarginValue = 300;

  it('renders the flat list with correct number of items', () => {
    const { getByTestId } = render(
      <FlatListWithRectangleIndicator
        data={data.slice(0, 3)}
        cardWidthPlusMarginValue={cardWidthPlusMarginValue}
        renderItem={undefined}
      />
    );
    const indicator1 = getByTestId('indicator-0');
    const indicator2 = getByTestId('indicator-1');
    const indicator3 = getByTestId('indicator-2');

    expect(indicator1).toBeTruthy();
    expect(indicator2).toBeTruthy();
    expect(indicator3).toBeTruthy();
  });

  const activeStyle = {
    width: activeWidthValue,
    backgroundColor: activeColor,
  };
  const inActiveStyle = {
    width: inActiveWidthValue,
    backgroundColor: inactiveColor,
  };
  it('changes the width and background color of the indicators when scrolling', async () => {
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

    expect(indicator1).toHaveStyle(activeStyle);
    expect(indicator2).toHaveStyle(inActiveStyle);
    expect(indicator3).toHaveStyle(inActiveStyle);

    const scrollableComponent = getByTestId('scrollable-component');

    function eventData(scrollXValue: number) {
      return {
        nativeEvent: {
          contentOffset: {
            y: 0,
            //play around this value to show the live change with sharedValue change from 0 - cardWidthPlusMarginValue
            x: scrollXValue,
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
    }

    // first scroll to the left with cardWidthPlusMarginValue
    fireEvent.scroll(scrollableComponent, eventData(cardWidthPlusMarginValue));

    jest.advanceTimersByTime(1);
    expect(indicator1).toHaveAnimatedStyle(inActiveStyle);
    expect(indicator2).toHaveAnimatedStyle(activeStyle);
    expect(indicator3).toHaveAnimatedStyle(inActiveStyle);

    //second scroll to the right with cardWidthPlusMarginValue * 2
    fireEvent.scroll(
      scrollableComponent,
      eventData(cardWidthPlusMarginValue * 2)
    );

    jest.advanceTimersByTime(1);
    expect(indicator1).toHaveAnimatedStyle(inActiveStyle);
    expect(indicator2).toHaveAnimatedStyle(inActiveStyle);
    expect(indicator3).toHaveAnimatedStyle(activeStyle);
  });
});
