import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import Gameboard from './Gameboard';
import { initialGameboardState } from '../../lib/common/constants';
import { store } from '../../app/store';

test('renders component', () => {
  const component = render(
    <Provider store={store}>
      <Gameboard id="example" type="human" gameState={initialGameboardState} />
    </Provider>,
  );
  console.log(component);
});

test('renders component without title name', () => {
  const component = render(
    <Provider store={store}>
      <Gameboard id="example" type="human" gameState={initialGameboardState} />
    </Provider>,
  );

  expect(component.container).not.toHaveTextContent('example');
});

test('renders component without title name', () => {
  const component = render(
    <Provider store={store}>
      <Gameboard id="example" withName type="human" gameState={initialGameboardState} />
    </Provider>,
  );

  expect(component.container).toHaveTextContent('example');
});
