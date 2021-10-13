import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import spanishInitialMessages from './components/common/messages/es-AR.json';
import englishInitialMessages from './components/common/messages/en-US.json';

test('renders component respecting spanish language', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App initialLang="es-AR" initialMessages={spanishInitialMessages} />
    </Provider>,
  );

  expect(getByText(/BATALLA NAVAL/i)).toBeInTheDocument();
});

test('renders component respecting english language', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App initialLang="en-US" initialMessages={englishInitialMessages} />
    </Provider>,
  );

  expect(getByText(/BATTLESHIP GAME/i)).toBeInTheDocument();
});

test('renders initial stage', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App initialLang="en-US" initialMessages={englishInitialMessages} />
    </Provider>,
  );

  expect(getByText(/START GAME/i)).toBeInTheDocument();
});
