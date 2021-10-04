import React, { useState } from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';

const GAMEBOARD_WIDTH = 300;
const GAMEBOARD_MOBILE_WIDTH = 300;
const BOARD_SIZE = 10;
const MOVEMENT_SIZE = GAMEBOARD_WIDTH / BOARD_SIZE;

type SHIP_TYPE = 'carrier' | 'cruiser' | 'submarine'

interface ShipShapeProps {
  className: SHIP_TYPE;
  orientation: string;
  size: number;
}

export const ShipShape = styled.div`
  position: absolute;
  background: grey;
  width: ${({ orientation, size }: ShipShapeProps) => (orientation === 'vertical' ? (GAMEBOARD_WIDTH / BOARD_SIZE) : ((GAMEBOARD_WIDTH / BOARD_SIZE) * size))}px;
  height: ${({ orientation, size }: ShipShapeProps) => (orientation === 'horizontal' ? (GAMEBOARD_WIDTH / BOARD_SIZE) : ((GAMEBOARD_WIDTH / BOARD_SIZE) * size))}px;
  @media (max-width: 996px) {
    width: ${({ orientation, size }: ShipShapeProps) => (orientation === 'vertical' ? (GAMEBOARD_MOBILE_WIDTH / BOARD_SIZE) : ((GAMEBOARD_MOBILE_WIDTH / BOARD_SIZE) * size))}px;
    height: ${({ orientation, size }: ShipShapeProps) => (orientation === 'horizontal' ? (GAMEBOARD_MOBILE_WIDTH / BOARD_SIZE) : ((GAMEBOARD_MOBILE_WIDTH / BOARD_SIZE) * size))}px;
  }
  `;

type SHIP_ORIENTATION='vertical' | 'horizontal'

type SHIP_SIZE = 2 | 3 | 4;

// interface IShipPosition {
//   x: number;
//   y: number;
// }

interface ShipProps {
  initialOrientation: SHIP_ORIENTATION;
  size: SHIP_SIZE;
  className: SHIP_TYPE;
}

function Ship({
  initialOrientation, size, className,
}: ShipProps) {
  const [orientation, setLocalOrientation] = useState<SHIP_ORIENTATION>(initialOrientation);

  const onChangeOrientation = (e: any) => {
    e.preventDefault();
    if (orientation === 'vertical') setLocalOrientation('horizontal');
    else setLocalOrientation('vertical');
  };

  return (
    <Draggable bounds="parent" defaultPosition={{ x: MOVEMENT_SIZE, y: MOVEMENT_SIZE }} grid={[MOVEMENT_SIZE, MOVEMENT_SIZE]} cancel=".btn">
      <ShipShape
        className={className}
        onContextMenu={onChangeOrientation}
        orientation={orientation}
        size={size}
      />
    </Draggable>
  );
}

export default Ship;
