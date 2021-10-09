import React, { useState, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';
import styled from 'styled-components';

// FUNCTIONS
import {
  isMultiple,
  getMovementCoordinatesFromCss,
  hasDuplicates,
  isValidName,
} from '../../lib/common/functions';

// CONSTANTS
import {
  GAMEBOARD_BORDER,
  GAMEBOARD_WIDTH_DESKTOP,
  GAMEBOARD_WIDTH_MOBILE,
  BOARD_SIZE,
  MOVEMENT_SIZE,
  CELL_SIZE_DESKTOP,
  CELL_SIZE_MOBILE,
  CARRIER_ID,
  CRUISER1_ID,
  CRUISER2_ID,
  CRUISER3_ID,
  SUBMARINE_ID,
  noError,
} from '../../lib/common/constants';

// TYPES
import {
  GAME_ERROR,
  SHIP_INFO,
} from '../../lib/common/types';

// COMPONENTS
import Gameboard from '../../components/Gameboard';
import {
  Screen,
  CurrentPlayer,
  Button,
  EnterName,
  MobilePanel,
} from '../../components/common/styles/screen';
import LoaderOverlay from '../../components/LoaderOverlay';

/// //////////////////
// LOCAL FUNCTIONS //
/// //////////////////

// this function receives the translation of each ship from (x,y)=(0,0) and
// check if ships are straight lines
const shipsStraightLinesValidation = (
  carrierTranslation: number[],
  cruiser1Translation: number[],
  cruiser2Translation: number[],
  cruiser3Translation: number[],
  submarineTranslation: number[],
  cellSize: number,
) => {
  let valid: boolean = true;
  const allTranslations: number[] = [
    ...carrierTranslation,
    ...cruiser1Translation,
    ...cruiser2Translation,
    ...cruiser3Translation,
    ...submarineTranslation,
  ];
  allTranslations.map((translation) => {
    if (!isMultiple(translation, cellSize)) {
      valid = false;
    }
    return 0;
  });
  return valid;
};

// function that calculates where the ship ends and check if it is out of gameboard
// in the X axis
const calculateXEnd = (
  vertical: boolean,
  size: number,
  translation: number,
  cellSize: number,
) => {
  let shipLong;
  if (vertical) shipLong = cellSize;
  else shipLong = cellSize * size;
  return shipLong + translation;
};

// function that calculates where the ship ends and check if it is out of gameboard
// in the Y axis
const calculateYEnd = (
  vertical: boolean,
  size: number,
  translation: number,
  cellSize: number,
) => {
  let shipLong;
  if (vertical) shipLong = cellSize * size;
  else shipLong = cellSize;
  return shipLong + translation;
};

// function that calculate all the cellsId what a ship is occupying
const getShipArea = (ship: SHIP_INFO, translation: number[], cellSize: number): number[] => {
  const shipArea = [];
  const tens = (translation[1] / cellSize) * 10;
  const units = (translation[0] / cellSize) + 1;
  const firstCell = tens + units;
  shipArea.push(firstCell);
  let accum = 0;
  for (let i = 1; i < ship.size; i += 1) {
    shipArea.push(firstCell + (ship.vertical ? accum += 10 : accum += 1));
  }
  return shipArea;
};

/// ///////////////////
// LOCAL COMPONENTS //
/// ///////////////////

interface ShipShapeProps {
  vertical: boolean;
  size: number;
}

export const ShipShape = styled.div`
  position: absolute;
  background: grey;
  border: 1px solid black;
  box-sizing: border-box;
  width: ${({ vertical, size }: ShipShapeProps) => (vertical ? (GAMEBOARD_WIDTH_DESKTOP / BOARD_SIZE) : ((GAMEBOARD_WIDTH_DESKTOP / BOARD_SIZE) * size))}px;
  height: ${({ vertical, size }: ShipShapeProps) => (!vertical ? (GAMEBOARD_WIDTH_DESKTOP / BOARD_SIZE) : ((GAMEBOARD_WIDTH_DESKTOP / BOARD_SIZE) * size))}px;
  @media (max-width: 996px) {
    width: ${({ vertical, size }: ShipShapeProps) => (vertical ? (GAMEBOARD_WIDTH_MOBILE / BOARD_SIZE) : ((GAMEBOARD_WIDTH_MOBILE / BOARD_SIZE) * size))}px;
    height: ${({ vertical, size }: ShipShapeProps) => (!vertical ? (GAMEBOARD_WIDTH_MOBILE / BOARD_SIZE) : ((GAMEBOARD_WIDTH_MOBILE / BOARD_SIZE) * size))}px;
  }
  `;

function InitialStage() {
  const [playerName, setPlayerName] = useState<string>('');
  const [error, setError] = useState<GAME_ERROR>(noError);
  const divRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentShipInfo, setCurrentShipInfo] = useState<SHIP_INFO | null>(null);
  const [carrier, setCarrier] = useState<SHIP_INFO>({
    id: CARRIER_ID,
    size: 4,
    vertical: true,
    initialX: 0,
    initialY: 0,
    initialized: false,
  });
  const [cruiser1, setCruiser1] = useState<SHIP_INFO>({
    id: CRUISER1_ID,
    size: 3,
    vertical: true,
    initialX: 0,
    initialY: 0,
    initialized: false,
  });
  const [cruiser2, setCruiser2] = useState<SHIP_INFO>({
    id: CRUISER2_ID,
    size: 3,
    vertical: true,
    initialX: 0,
    initialY: 0,
    initialized: false,
  });
  const [cruiser3, setCruiser3] = useState<SHIP_INFO>({
    id: CRUISER3_ID,
    size: 3,
    vertical: true,
    initialX: 0,
    initialY: 0,
    initialized: false,
  });
  const [submarine, setSubmarine] = useState<SHIP_INFO>({
    id: SUBMARINE_ID,
    size: 2,
    vertical: true,
    initialX: 0,
    initialY: 0,
    initialized: false,
  });

  const getGameboardWidthFromDOM = (): number => divRef.current?.offsetWidth || 0;

  const getInitialCoordinate = (id: number): number => {
    const gameboardWidth = getGameboardWidthFromDOM() - (2 * GAMEBOARD_BORDER);
    if (gameboardWidth === GAMEBOARD_WIDTH_DESKTOP) {
      return (CELL_SIZE_DESKTOP) * (id - 1) + ((id - 1) * CELL_SIZE_DESKTOP);
    }
    return (CELL_SIZE_MOBILE) * (id - 1) + ((id - 1) * CELL_SIZE_MOBILE);
  };

  const handleChangeOrientationById = (id: string, e:any): void => {
    e.preventDefault();
    switch (id) {
      case CARRIER_ID:
        setCarrier((prev: SHIP_INFO) => ({
          ...prev,
          vertical: !prev.vertical,
        }));
        break;
      case CRUISER1_ID:
        setCruiser1((prev: SHIP_INFO) => ({
          ...prev,
          vertical: !prev.vertical,
        }));
        break;
      case CRUISER2_ID:
        setCruiser2((prev: SHIP_INFO) => ({
          ...prev,
          vertical: !prev.vertical,
        }));
        break;
      case CRUISER3_ID:
        setCruiser3((prev: SHIP_INFO) => ({
          ...prev,
          vertical: !prev.vertical,
        }));
        break;
      case SUBMARINE_ID:
        setSubmarine((prev: SHIP_INFO) => ({
          ...prev,
          vertical: !prev.vertical,
        }));
        break;
      default: break;
    }
    setCurrentShipInfo((prev: SHIP_INFO | null) => {
      if (prev) {
        return {
          ...prev,
          vertical: !prev.vertical,
        };
      }
      return null;
    });
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
    }, 2000);
  }, []);

  const shipInGameboard = (
    ship: SHIP_INFO,
    translation: number[],
    gameboardWidth: number,
  ): boolean => {
    const cellSize = gameboardWidth / BOARD_SIZE;
    let xEnd = 0;
    let yEnd = 0;

    xEnd = calculateXEnd(
      ship.vertical, ship.size, translation[0], cellSize,
    );
    yEnd = calculateYEnd(
      ship.vertical, ship.size, translation[1], cellSize,
    );
    if (xEnd <= gameboardWidth && yEnd <= gameboardWidth) return true; return false;
  };

  const sendShips = () => {
    // validate name
    if (!isValidName(playerName)) {
      setError({ has: true, description: 'Invalid player name' }); return;
    }
    // get neccesary data to validations
    const gameboardWidth = getGameboardWidthFromDOM() - (2 * GAMEBOARD_BORDER);
    const CELL_SIZE = gameboardWidth / BOARD_SIZE;
    const carrierTranslation: number[] = getMovementCoordinatesFromCss(document.getElementById(CARRIER_ID)?.getAttribute('style') || '');
    const cruiser1Translation: number[] = getMovementCoordinatesFromCss(document.getElementById(CRUISER1_ID)?.getAttribute('style') || '');
    const cruiser2Translation: number[] = getMovementCoordinatesFromCss(document.getElementById(CRUISER2_ID)?.getAttribute('style') || '');
    const cruiser3Translation: number[] = getMovementCoordinatesFromCss(document.getElementById(CRUISER3_ID)?.getAttribute('style') || '');
    const submarineTranslation: number[] = getMovementCoordinatesFromCss(document.getElementById(SUBMARINE_ID)?.getAttribute('style') || '');
    // ships in bounds validation
    if (!shipsStraightLinesValidation(
      carrierTranslation,
      cruiser1Translation,
      cruiser2Translation,
      cruiser3Translation,
      submarineTranslation,
      CELL_SIZE,
    )) {
      setError({ has: true, description: 'StraightLinesFailed' }); return;
    }
    // ships in gameboard validation
    if (!shipInGameboard(carrier, carrierTranslation, gameboardWidth)) { setError({ has: true, description: 'Carrier out of gameboard' }); return; }
    if (!shipInGameboard(cruiser1, cruiser1Translation, gameboardWidth)) { setError({ has: true, description: 'Cruiser 1 out of gameboard' }); return; }
    if (!shipInGameboard(cruiser2, cruiser2Translation, gameboardWidth)) { setError({ has: true, description: 'Cruiser 2 out of gameboard' }); return; }
    if (!shipInGameboard(cruiser3, cruiser3Translation, gameboardWidth)) { setError({ has: true, description: 'Cruiser 3 out of gameboard' }); return; }
    if (!shipInGameboard(submarine, submarineTranslation, gameboardWidth)) { setError({ has: true, description: 'Submarine out of gameboard' }); return; }
    // overlaping validation
    const carrierArea: number[] = getShipArea(carrier, carrierTranslation, CELL_SIZE);
    const cruiser1Area: number[] = getShipArea(cruiser1, cruiser1Translation, CELL_SIZE);
    const cruiser2Area: number[] = getShipArea(cruiser2, cruiser2Translation, CELL_SIZE);
    const cruiser3Area: number[] = getShipArea(cruiser3, cruiser3Translation, CELL_SIZE);
    const submarineArea: number[] = getShipArea(submarine, submarineTranslation, CELL_SIZE);
    const totalArea: number[] = [
      ...carrierArea,
      ...cruiser1Area,
      ...cruiser2Area,
      ...cruiser3Area,
      ...submarineArea,
    ];
    if (hasDuplicates(totalArea)) { setError({ has: true, description: 'Overlaped ships' }); return; }
    // if comes here then send ships to the store
    setError(noError);
    // here sendShips redux function
  };

  return (
    <Screen>
      <LoaderOverlay loading={loading}>
        <div ref={divRef}>
          <Gameboard id="gb" type="player" ownShipsList={[]} destroyedShipsList={[]} hittedShipsList={[]} missedShipsList={[]}>
            <>
              {carrier.initialized && (
              <Draggable onStart={() => setCurrentShipInfo(carrier)} bounds="parent" defaultPosition={{ x: carrier.initialX, y: carrier.initialY }} grid={[MOVEMENT_SIZE, MOVEMENT_SIZE]} cancel=".btn">
                <ShipShape
                  className="carrier"
                  onContextMenu={(e: any) => handleChangeOrientationById(carrier.id, e)}
                  vertical={carrier.vertical}
                  size={carrier.size}
                  id={carrier.id}
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
                  id={cruiser1.id}
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
                  id={cruiser2.id}
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
                  id={cruiser3.id}
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
                  id={submarine.id}
                />
              </Draggable>
              )}
            </>
          </Gameboard>
        </div>
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
        {error.has && <div>{error.description }</div>}
        <Button onClick={sendShips}>
          START GAME
        </Button>
        <CurrentPlayer>
          <EnterName id="name" name="name" value={playerName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPlayerName(e.target.value)} placeholder="Player name" />
        </CurrentPlayer>
      </div>
    </Screen>
  );
}

export default InitialStage;
