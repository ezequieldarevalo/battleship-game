import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import styled from 'styled-components';
import Gameboard from '../../components/Gameboard';
import {
  Screen,
  CurrentPlayer,
  Button,
  EnterName,
  MobilePanel,
} from '../../components/common/styles/screen';
import LoaderOverlay from '../../components/LoaderOverlay';

const GAMEBOARD_BORDER = 1;
const GAMEBOARD_WIDTH_DESKTOP = 400;
const GAMEBOARD_WIDTH_MOBILE = 300;
const BOARD_SIZE = 10;
const MOVEMENT_SIZE = 10;
const CELL_SIZE_DESKTOP = GAMEBOARD_WIDTH_DESKTOP / BOARD_SIZE;
const CELL_SIZE_MOBILE = GAMEBOARD_WIDTH_MOBILE / BOARD_SIZE;

interface ShipShapeProps {
  vertical: boolean;
  size: number;
}

export const ShipShape = styled.div`
  position: absolute;
  background: grey;
  width: ${({ vertical, size }: ShipShapeProps) => (vertical ? (GAMEBOARD_WIDTH_DESKTOP / BOARD_SIZE) : ((GAMEBOARD_WIDTH_DESKTOP / BOARD_SIZE) * size))}px;
  height: ${({ vertical, size }: ShipShapeProps) => (!vertical ? (GAMEBOARD_WIDTH_DESKTOP / BOARD_SIZE) : ((GAMEBOARD_WIDTH_DESKTOP / BOARD_SIZE) * size))}px;
  @media (max-width: 996px) {
    width: ${({ vertical, size }: ShipShapeProps) => (vertical ? (GAMEBOARD_WIDTH_MOBILE / BOARD_SIZE) : ((GAMEBOARD_WIDTH_MOBILE / BOARD_SIZE) * size))}px;
    height: ${({ vertical, size }: ShipShapeProps) => (!vertical ? (GAMEBOARD_WIDTH_MOBILE / BOARD_SIZE) : ((GAMEBOARD_WIDTH_MOBILE / BOARD_SIZE) * size))}px;
  }
  `;

// const GAMEBOARD_BORDER = 1;

const getGameboardWidthFromDOM = ():number => {
  const gameboard = document.getElementById('gb');
  return (gameboard?.offsetWidth || 2) - (2 * GAMEBOARD_BORDER);
};

const getInitialCoordinate = (id: number):number => {
  const gameboardWidth = getGameboardWidthFromDOM();
  if (gameboardWidth === GAMEBOARD_WIDTH_DESKTOP) {
    return (CELL_SIZE_DESKTOP) * (id - 1) + ((id - 1) * CELL_SIZE_DESKTOP);
  }

  return (CELL_SIZE_MOBILE) * (id - 1) + ((id - 1) * CELL_SIZE_MOBILE);
};

export type SHIP_SIZE = 2 | 3 | 4;

export interface IInfoShip {
  id: number;
  size: SHIP_SIZE;
  vertical: boolean;
  initialX: number;
  initialY: number;
  initialized: boolean;
}

function InitialStage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [currentShipInfo, setCurrentShipInfo] = useState<IInfoShip | null>(null);
  const [carrier, setCarrier] = useState<IInfoShip>({
    id: 1,
    size: 4,
    vertical: true,
    initialX: 0,
    initialY: 0,
    initialized: false,
  });
  const [cruiser1, setCruiser1] = useState<IInfoShip>({
    id: 2,
    size: 3,
    vertical: true,
    initialX: 0,
    initialY: 0,
    initialized: false,
  });
  const [cruiser2, setCruiser2] = useState<IInfoShip>({
    id: 3,
    size: 3,
    vertical: true,
    initialX: 0,
    initialY: 0,
    initialized: false,
  });
  const [cruiser3, setCruiser3] = useState<IInfoShip>({
    id: 4,
    size: 3,
    vertical: true,
    initialX: 0,
    initialY: 0,
    initialized: false,
  });
  const [submarine, setSubmarine] = useState<IInfoShip>({
    id: 5,
    size: 2,
    vertical: true,
    initialX: 0,
    initialY: 0,
    initialized: false,
  });

  const handleChangeOrientationById = (id: number, e:any): void => {
    e.preventDefault();
    switch (id) {
      case 1:
        setCarrier((prev: IInfoShip) => ({
          ...prev,
          vertical: !prev.vertical,
        }));
        break;
      case 2:
        setCruiser1((prev: IInfoShip) => ({
          ...prev,
          vertical: !prev.vertical,
        }));
        break;
      case 3:
        setCruiser2((prev: IInfoShip) => ({
          ...prev,
          vertical: !prev.vertical,
        }));
        break;
      case 4:
        setCruiser3((prev: IInfoShip) => ({
          ...prev,
          vertical: !prev.vertical,
        }));
        break;
      case 5:
        setSubmarine((prev: IInfoShip) => ({
          ...prev,
          vertical: !prev.vertical,
        }));
        break;
      default: break;
    }
  };

  useEffect(() => {
    setTimeout(() => {
      let initialCoordinate = getInitialCoordinate(1);
      setCarrier({
        ...carrier, initialX: initialCoordinate, initialY: initialCoordinate, initialized: true,
      });
      initialCoordinate = getInitialCoordinate(2);
      setCruiser1({
        ...cruiser1, initialX: initialCoordinate, initialY: initialCoordinate, initialized: true,
      });
      initialCoordinate = getInitialCoordinate(3);
      setCruiser2({
        ...cruiser2, initialX: initialCoordinate, initialY: initialCoordinate, initialized: true,
      });
      initialCoordinate = getInitialCoordinate(4);
      setCruiser3({
        ...cruiser3, initialX: initialCoordinate, initialY: initialCoordinate, initialized: true,
      });
      initialCoordinate = getInitialCoordinate(5);
      setSubmarine({
        ...submarine, initialX: initialCoordinate, initialY: initialCoordinate, initialized: true,
      });
      setLoading(false);
    }, 3000);
  }, []);

  // const shipsInBound = () => {
  //   const gameboardWidth = getGameboardWidthFromDOM();
  //   carrierInBounds =
  // };

  const sendShips = () => {

    // ships in bounds validation

    // const gameboard = document.getElementById('gb');
    // const gameboardWidth = gameboard?.offsetWidth || 0;
    // console.log(gameboardWidth - (2 * GAMEBOARD_BORDER));

    // const cruisers = Array.from(document.getElementsByClassName('cruiser'));
    // console.log(cruisers);
    // cruisers.map((cruiser) => {
    //   console.log(cruiser.getAttribute('style'));
    //   console.log(cruiser.getAttribute('id'));

    //   console.log(cruiser.getAttribute('size'));
    //   return '';
    // });
  };

  return (
    <Screen>
      <LoaderOverlay loading={loading}>
        <Gameboard id="gb" type="player" ownShipsList={[]} destroyedShipsList={[]} hittedShipsList={[]} missedShipsList={[]}>
          <>

            {carrier.initialized && (
            <Draggable onStart={() => setCurrentShipInfo(carrier)} bounds="parent" defaultPosition={{ x: carrier.initialX, y: carrier.initialY }} grid={[MOVEMENT_SIZE, MOVEMENT_SIZE]} cancel=".btn">
              <ShipShape
                className="carrier"
                onContextMenu={(e: any) => handleChangeOrientationById(carrier.id, e)}
                vertical={carrier.vertical}
                size={carrier.size}
                id={carrier.id.toString()}
              />
            </Draggable>
            )}
            {cruiser1.initialized && (
            <Draggable onStart={() => setCurrentShipInfo(cruiser1)} bounds="parent" defaultPosition={{ x: cruiser1.initialX, y: cruiser1.initialY }} grid={[MOVEMENT_SIZE, MOVEMENT_SIZE]} cancel=".btn">
              <ShipShape
                className="cruiser"
                onContextMenu={(e: any) => handleChangeOrientationById(cruiser1.id, e)}
                vertical={cruiser1.vertical}
                size={cruiser1.size}
                id={cruiser1.id.toString()}
              />
            </Draggable>
            )}
            {cruiser2.initialized && (
            <Draggable onStart={() => setCurrentShipInfo(cruiser2)} bounds="parent" defaultPosition={{ x: cruiser2.initialX, y: cruiser2.initialY }} grid={[MOVEMENT_SIZE, MOVEMENT_SIZE]} cancel=".btn">
              <ShipShape
                className="cruiser"
                onContextMenu={(e: any) => handleChangeOrientationById(cruiser2.id, e)}
                vertical={cruiser2.vertical}
                size={cruiser2.size}
                id={cruiser2.id.toString()}
              />
            </Draggable>
            )}
            {cruiser3.initialized && (
            <Draggable onStart={() => setCurrentShipInfo(cruiser3)} bounds="parent" defaultPosition={{ x: cruiser3.initialX, y: cruiser3.initialY }} grid={[MOVEMENT_SIZE, MOVEMENT_SIZE]} cancel=".btn">
              <ShipShape
                className="cruiser"
                onContextMenu={(e: any) => handleChangeOrientationById(cruiser3.id, e)}
                vertical={cruiser3.vertical}
                size={cruiser3.size}
                id={cruiser3.id.toString()}
              />
            </Draggable>
            )}
            {submarine.initialized && (
            <Draggable onStart={() => setCurrentShipInfo(submarine)} bounds="parent" defaultPosition={{ x: submarine.initialX, y: submarine.initialY }} grid={[MOVEMENT_SIZE, MOVEMENT_SIZE]} cancel=".btn">
              <ShipShape
                className="submarine"
                onContextMenu={(e: any) => handleChangeOrientationById(submarine.id, e)}
                vertical={submarine.vertical}
                size={submarine.size}
                id={submarine.id.toString()}
              />
            </Draggable>
            )}
          </>
        </Gameboard>
      </LoaderOverlay>
      <MobilePanel>
        {currentShipInfo && (
        <>
          Longitud:
          {' '}
          {currentShipInfo.size}
          {' '}
          <br />
          Orientacion:
          {' '}
            {currentShipInfo.vertical ? 'vertical' : 'horizontal'}
          <br />
          <button onClick={(e) => handleChangeOrientationById(currentShipInfo.id, e)} type="button">Cambiar orientacion</button>
        </>
        )}
      </MobilePanel>
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
