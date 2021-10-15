import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import Gameboard from './Gameboard';
import { initialGameboardState } from '../../lib/common/constants';
import { store } from '../../app/store';
import { gamboardWithFirstOwnCell } from '../../lib/common/testConstants';

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

test('renders component with title name', () => {
  const component = render(
    <Provider store={store}>
      <Gameboard id="example" withName type="human" gameState={initialGameboardState} />
    </Provider>,
  );

  expect(component.container).toHaveTextContent('example');
});

test('renders component with no gameState every transparent backgrounds ', () => {
  const component = render(
    <Provider store={store}>
      <Gameboard id="example" type="human" />
    </Provider>,
  );

  expect(component.container.querySelector('div[type="human"]')).toHaveStyle('background: transparent');
});

test('renders component with no gameState shows full board', () => {
  const component = render(
    <Provider store={store}>
      <Gameboard id="example" type="human" />
    </Provider>,
  );

  expect(component.container.querySelectorAll('div[type="human"]')).toHaveLength(100);
});

test('renders component with first own cell not showed in cpu gamboard', () => {
  const component = render(
    <Provider store={store}>
      <Gameboard id="example" type="cpu" gameState={gamboardWithFirstOwnCell} />
    </Provider>,
  );

  expect(component.container.querySelector('div[type="cpu"]'))
    .toHaveStyle('background: transparent');
});

test('renders component with own cells showed in human gamboard', () => {
  const component = render(
    <Provider store={store}>
      <Gameboard id="example" type="human" gameState={gamboardWithFirstOwnCell} />
    </Provider>,
  );

  expect(component.container.querySelector('div[type="human"]'))
    .toHaveStyle('background: grey');
});
