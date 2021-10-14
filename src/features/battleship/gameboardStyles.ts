import styled from 'styled-components';
import { CELL_STATE } from '../../lib/common/types';
import {
  GAMEBOARD_WIDTH_DESKTOP, GAMEBOARD_WIDTH_MOBILE, GAMEBOARD_WIDTH_MOBILE_MIN, GAMEBOARD_BORDER,
} from '../../lib/common/config';

const getBGColorFromState = (state: string, type: 'human' | 'cpu') => {
  switch (state) {
    case 'own':
      if (type === 'human') return 'grey'; return 'transparent';
    case 'hitted': return 'orange';
    case 'destroyed': return 'red';
    case 'missed': return 'skyblue';
    default: return 'transparent';
  }
};

const getBorderColorFromState = (state: string) => {
  switch (state) {
    case 'own':
      return 'grey';
    case 'hitted': return 'orange';
    case 'destroyed': return 'red';
    case 'missed': return 'skyblue';
    default: return 'grey';
  }
};

export const BoardContainer = styled.div`
  position: relative;
  float: left;
`;

export const BoardTitle = styled.h1`
`;

interface BoardGridProps {
  miniature?: boolean;
}

export const BoardGrid = styled.div`
  position: relative;
  display: grid;
  border: ${GAMEBOARD_BORDER}px solid black;
  grid-template-columns: auto auto auto auto auto auto auto auto auto auto;
  width: ${GAMEBOARD_WIDTH_DESKTOP}px;
  height: ${GAMEBOARD_WIDTH_DESKTOP}px;
  @media (max-width: 996px) {
    width: ${({ miniature }: BoardGridProps) => (miniature ? `${GAMEBOARD_WIDTH_MOBILE_MIN}px` : `${GAMEBOARD_WIDTH_MOBILE}px`)};
    height: ${({ miniature }: BoardGridProps) => (miniature ? `${GAMEBOARD_WIDTH_MOBILE_MIN}px` : `${GAMEBOARD_WIDTH_MOBILE}px`)};
  }
`;

interface ICellContainerProps {
  state: CELL_STATE,
  type: 'human' | 'cpu'
}
export const CellContainer = styled.div`
  border: 1px solid ${({ state }: ICellContainerProps) => getBorderColorFromState(state)};
  background: ${({ state, type }: ICellContainerProps) => getBGColorFromState(state, type)}
`;
