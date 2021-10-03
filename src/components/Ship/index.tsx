import React from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';

const GAMEBOARD_WIDTH = 400;
const BOARD_SIZE = 10;

interface ShipShapeProps {
  orientation: string;
  size: number;
}

export const ShipShape = styled.div`
  background: grey;
  float: left;
  width: ${({ orientation, size }: ShipShapeProps) => (orientation === 'vertical' ? (GAMEBOARD_WIDTH / BOARD_SIZE) : ((GAMEBOARD_WIDTH / BOARD_SIZE) * size))}px;
  height: ${({ orientation, size }: ShipShapeProps) => (orientation === 'horizontal' ? (GAMEBOARD_WIDTH / BOARD_SIZE) : ((GAMEBOARD_WIDTH / BOARD_SIZE) * size))}px;
`;

type SHIP_ORIENTATION='vertical' | 'horizontal'

type SHIP_SIZE = 2 | 3 | 4;

interface ShipProps {
  orientation: SHIP_ORIENTATION;
  size: SHIP_SIZE;
}

function Ship({ orientation, size }:ShipProps) {
  return (
    <Draggable cancel=".btn">
      <ShipShape orientation={orientation} size={size} />
    </Draggable>
  );
}

export default Ship;
