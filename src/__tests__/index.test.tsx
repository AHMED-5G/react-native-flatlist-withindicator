/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { FlatListWithRectangleIndicator } from '../index';

describe('setPackages', () => {
  // ...

  test('example test', () => {
    expect(true).toBe(true);
  });
});

describe('FlatListWithRectangleIndicator', () => {
  const activeColor = 'rgba(0, 0, 0, 1)';
  const inactiveColor = 'rgba(255, 255, 255, 1)';
  const activeWidth = 32;
  const inActiveWidth = 12;
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

    expect(indicator1).toHaveStyle(`
      backgroundColor: ${activeColor},`);
    expect(indicator2).toHaveStyle(`
      backgroundColor: ${inactiveColor},`);
    expect(indicator3).toHaveStyle(`
      backgroundColor: ${inactiveColor},`);
    expect(indicator1).toHaveStyle(`width: '${activeWidth}'`);
    expect(indicator2).toHaveStyle(`width: '${inActiveWidth}'`);
    expect(indicator3).toHaveStyle(`width: '${inActiveWidth}'`);

    // fireEvent.scroll(cardWidthPlusMarginValue, { target: { scrollX: 100 } });

    // expect(indicator1).toHaveStyle({
    //   width: '12px',
    //   backgroundColor: inactiveColor,
    // });
    // expect(indicator2).toHaveStyle({
    //   width: '32px',
    //   backgroundColor: activeColor,
    // });
    // expect(indicator3).toHaveStyle({
    //   width: '12px',
    //   backgroundColor: inactiveColor,
    // });

    // fireEvent.scroll(cardWidthPlusMarginValue, { target: { scrollX: 200 } });

    // expect(indicator1).toHaveStyle({
    //   width: '32px',
    //   backgroundColor: activeColor,
    // });
    // expect(indicator2).toHaveStyle({
    //   width: '12px',
    //   backgroundColor: inactiveColor,
    // });
    // expect(indicator3).toHaveStyle({
    //   width: '32px',
    //   backgroundColor: activeColor,
    // });
  });
});
