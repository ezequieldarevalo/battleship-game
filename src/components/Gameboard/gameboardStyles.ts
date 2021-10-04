import styled from 'styled-components';

const getBGColorFromState = (state:string) => {
  switch (state) {
    case 'own': return 'grey';
    case 'hitted': return 'orange';
    case 'destroyed': return 'red';
    case 'missed': return 'skyblue';
    default: return 'transparent';
  }
};

export const BoardContainer = styled.div`
  position: relative;
  float: left;
  margin: 20px;
`;

export const BoardTitle = styled.h1`
`;

interface BoardGridProps {
  miniature?: boolean;
}

export const BoardGrid = styled.div`
  position: relative;
  display: grid;
  border: 1px solid black;
  grid-template-columns: auto auto auto auto auto auto auto auto auto auto;
  width: 300px;
  height: 300px;
  @media (max-width: 996px) {
    width: ${({ miniature }:BoardGridProps) => (miniature ? '150px' : '300px')};
    height: ${({ miniature }: BoardGridProps) => (miniature ? '150px' : '300px')};
  }
`;

interface ICellContainerProps {
  state: 'own' | 'hitted' | 'destroyed' | 'missed' |'none'
}
export const CellContainer = styled.div`

  border: 1px solid black;
  background: ${({ state }: ICellContainerProps) => getBGColorFromState(state)}
`;
