import styled from 'styled-components';

export const GameScreen = styled.div`
  position: relative;
  float: left;
`;

export const InitialScreen = styled.div`
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
`;

export const SurrenderButton = styled.button.attrs({ type: 'button' })`
`;

export const InfoAndActionsPanel = styled.div`
  float: right;
`;
