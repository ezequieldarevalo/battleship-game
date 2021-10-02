import styled from 'styled-components';

const getBGColorFromState = (state:string) => {
  switch (state) {
    case 'own': return 'grey';
    case 'hitted': return 'orange';
    case 'destroyed': return 'red';
    case 'missed': return 'skyblue';
    default: return 'white';
  }
};

export const BoardContainer = styled.div`
  float: left;
  margin: 20px;
`;

export const BoardTitle = styled.h1`
`;

export const BoardGrid = styled.div`
  display: grid;
  border: 1px solid black;
  grid-template-columns: auto auto auto auto auto auto auto auto auto auto;
  width: 400px;
  height: 400px;
`;

interface ICellContainerProps {
  state: 'own' | 'hitted' | 'destroyed' | 'missed' |'none'
}
export const CellContainer = styled.div`
  border: 1px solid black;
  background: ${({ state }: ICellContainerProps) => getBGColorFromState(state)}
`;
