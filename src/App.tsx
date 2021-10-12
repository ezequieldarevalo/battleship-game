import React, { useState } from 'react';
import styled from 'styled-components';
import { I18nProvider, IMessages } from './contexts/I18n';
import Battleship from './features/battleship/Battleship';
import I18n from './components/common/i18n';

const AppContainer = styled.div`
  display: grid;
  grid-template-columns:20px auto 20px;
  justify-content:center;
  @media (max-width: 996px) {
    grid-template-columns:10px auto 10px;
  }
`;

interface II18nStateProps {
  initialLang: string;
  initialMessages: IMessages;
  children: any;
}

function I18nState({
  initialLang,
  initialMessages,
  children,
}: II18nStateProps) {
  const [lang] = useState(initialLang);
  const [messages] = useState(initialMessages);

  return (
    <I18nProvider lang={lang} messages={messages}>
      {children}
    </I18nProvider>
  );
}

interface IProps {
  initialLang: string;
  initialMessages: IMessages;
}

function App({
  initialLang,
  initialMessages,
}:IProps) {
  return (
    <I18nState initialLang={initialLang} initialMessages={initialMessages}>
      <AppContainer>
        <div id="margin-left" />
        <div id="main-container">
          <I18n id="app.name" />
          <br />
          <Battleship />
        </div>
        <div id="margin-right" />
      </AppContainer>
    </I18nState>

  );
}

export default App;
