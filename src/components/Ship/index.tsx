import React from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';

const GAMEBOARD_WIDTH = 400;
const GAMEBOARD_MOBILE_WIDTH = 300;
const BOARD_SIZE = 10;
const MOVEMENT_SIZE = GAMEBOARD_WIDTH / BOARD_SIZE;

interface ShipShapeProps {
  orientation: string;
  size: number;
}

export const ShipShape = styled.div`
  margin: 5px;
  background: grey;
  float: left;
  width: ${({ orientation, size }: ShipShapeProps) => (orientation === 'vertical' ? (GAMEBOARD_WIDTH / BOARD_SIZE) : ((GAMEBOARD_WIDTH / BOARD_SIZE) * size))}px;
  height: ${({ orientation, size }: ShipShapeProps) => (orientation === 'horizontal' ? (GAMEBOARD_WIDTH / BOARD_SIZE) : ((GAMEBOARD_WIDTH / BOARD_SIZE) * size))}px;
  @media (max-width: 996px) {
    width: ${({ orientation, size }: ShipShapeProps) => (orientation === 'vertical' ? (GAMEBOARD_MOBILE_WIDTH / BOARD_SIZE) : ((GAMEBOARD_MOBILE_WIDTH / BOARD_SIZE) * size))}px;
    height: ${({ orientation, size }: ShipShapeProps) => (orientation === 'horizontal' ? (GAMEBOARD_MOBILE_WIDTH / BOARD_SIZE) : ((GAMEBOARD_MOBILE_WIDTH / BOARD_SIZE) * size))}px;
  }
  `;

type SHIP_ORIENTATION='vertical' | 'horizontal'

type SHIP_SIZE = 2 | 3 | 4;

interface ShipProps {
  orientation: SHIP_ORIENTATION;
  size: SHIP_SIZE;
  onStopFunction: (x:number, y:number) => void;
}

function Ship({ orientation, size, onStopFunction }: ShipProps) {
  const handleDragStop = (event: any) => {
    onStopFunction(event.x, event.y);
  };

  return (
    <Draggable grid={[MOVEMENT_SIZE, MOVEMENT_SIZE]} onStop={handleDragStop} cancel=".btn">
      <ShipShape orientation={orientation} size={size} />
    </Draggable>
  );
}

export default Ship;
