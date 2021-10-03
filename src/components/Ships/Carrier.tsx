import React from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';

const GAMEBOARD_WIDTH = 400;
const CARRIER_LONG = 3;
const BOARD_SIZE = 10;

interface CarrierShapeProps {
  orientation: string
}

export const CarrierShape = styled.div`
  background: grey;
  float: left;
  width: ${({ orientation }: CarrierShapeProps) => (orientation === 'vertical' ? (GAMEBOARD_WIDTH / BOARD_SIZE) : ((GAMEBOARD_WIDTH / BOARD_SIZE) * CARRIER_LONG))}px;
  height: ${({ orientation }: CarrierShapeProps) => (orientation === 'horizontal' ? (GAMEBOARD_WIDTH / BOARD_SIZE) : ((GAMEBOARD_WIDTH / BOARD_SIZE) * CARRIER_LONG))}px;
`;

interface CarrierProps {
  orientation: 'vertical' | 'horizontal'
}

function Carrier({ orientation }:CarrierProps) {
  return (
    <Draggable cancel=".btn">
      <CarrierShape orientation={orientation} />
    </Draggable>
  );
}

export default Carrier;
