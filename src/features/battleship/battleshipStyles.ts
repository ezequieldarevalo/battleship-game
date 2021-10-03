import styled from 'styled-components';

export const GameScreen = styled.div`
  position: relative;
  float: left;
  display: block;
`;

export const InitialScreen = styled.div`
  position: relative;
  float: left;
`;

export const EndGameScreen = styled.div`
  position: relative;
  float: left;
`;

export const GameboardsPanel = styled.div`
  position: relative;
  float: left;
  display: flex;
  flex-wrap: wrap;
`;

export const CurrentPlayer = styled.div`
  display: inline-block;
  float: right;
`;

export const Button = styled.button.attrs({ type: 'button' })`
  float:right;
`;

export const EnterName = styled.input.attrs({ type: 'text' })``;

export const WinnerName = styled.div``;

export const WinnerDescription = styled.div``;
