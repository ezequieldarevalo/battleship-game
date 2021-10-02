import React from 'react';
import { Gameboard } from '../gameboard/Gameboard';

function Battleship() {
  // only game screen
  return (
    <>
      <Gameboard type="player" ownShipsList={[1, 2, 4, 6, 7]} destroyedShipsList={[32, 42, 52, 62]} hittedShipsList={[]} missedShipsList={[]} />
      <Gameboard type="cpu" ownShipsList={[]} destroyedShipsList={[]} hittedShipsList={[50]} missedShipsList={[51]} />
    </>
  );
}

export default Battleship;
