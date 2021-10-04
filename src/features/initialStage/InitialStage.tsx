import React from 'react';
import Gameboard from '../../components/Gameboard';
import {
  Screen,
  CurrentPlayer,
  Button,
  EnterName,
} from '../../components/common/styles/screen';
import Ship from '../../components/Ship';

const sendShips = () => {
  const cruisers = Array.from(document.getElementsByClassName('cruiser'));
  cruisers.map((cruiser) => {
    console.log(cruiser.getAttribute('style'));
    console.log(cruiser.getAttribute('orientation'));
    console.log(cruiser.getAttribute('size'));
    return '';
  });
};

function InitialStage() {
  return (
    <Screen>
      <Gameboard type="player" ownShipsList={[]} destroyedShipsList={[]} hittedShipsList={[]} missedShipsList={[]}>
        <>
          <Ship className="carrier" initialOrientation="vertical" size={4} />
          <Ship className="cruiser" initialOrientation="vertical" size={3} />
          <Ship className="cruiser" initialOrientation="vertical" size={3} />
          <Ship className="cruiser" initialOrientation="vertical" size={3} />
          <Ship className="submarine" initialOrientation="vertical" size={2} />
        </>
      </Gameboard>
      <div>
        <Button onClick={sendShips}>
          START GAME
        </Button>
        <CurrentPlayer>
          <EnterName id="name" name="name" placeholder="Player name" />
        </CurrentPlayer>
      </div>
    </Screen>
  );
}

export default InitialStage;
