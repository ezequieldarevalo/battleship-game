import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import publicInitialMessages from './components/common/messages/es-AR.json';

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App initialLang="es-AR" initialMessages={publicInitialMessages} />
    </Provider>,
  );

  expect(getByText(/learn/i)).toBeInTheDocument();
});
