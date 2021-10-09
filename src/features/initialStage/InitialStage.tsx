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
const CARRIER_ID = '1';
const CRUISER1_ID = '2';
const CRUISER2_ID = '3';
const CRUISER3_ID = '4';
const SUBMARINE_ID = '5';

const isMultiple = (value: number, reference: number): boolean => {
  const remainder = value % reference;
  if (remainder === 0) {
    return true;
  }
  return false;
};

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

interface ShipShapeProps {
  vertical: boolean;
  size: number;
}

function getMovementCoordinatesFromCss(value: string): number[] {
  const regexp = /(\d+)px, (\d+)/g;
  return [+[...value.matchAll(regexp)][0][1],
    +[...value.matchAll(regexp)][0][2]];
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

export type SHIP_SIZE = 2 | 3 | 4;

export interface IInfoShip {
  id: string;
  size: SHIP_SIZE;
  vertical: boolean;
  initialX: number;
  initialY: number;
  initialized: boolean;
}

interface IError {
  has: boolean;
  description: string;
}

const noError:IError = {
  has: false,
  description: '',
};

function InitialStage() {
  const [error, setError] = useState<IError>(noError);
  const divRef = React.useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentShipInfo, setCurrentShipInfo] = useState<IInfoShip | null>(null);
  const [carrier, setCarrier] = useState<IInfoShip>({
    id: CARRIER_ID,
    size: 4,
    vertical: true,
    initialX: 0,
    initialY: 0,
    initialized: false,
  });
  const [cruiser1, setCruiser1] = useState<IInfoShip>({
    id: CRUISER1_ID,
    size: 3,
    vertical: true,
    initialX: 0,
    initialY: 0,
    initialized: false,
  });
  const [cruiser2, setCruiser2] = useState<IInfoShip>({
    id: CRUISER2_ID,
    size: 3,
    vertical: true,
    initialX: 0,
    initialY: 0,
    initialized: false,
  });
  const [cruiser3, setCruiser3] = useState<IInfoShip>({
    id: CRUISER3_ID,
    size: 3,
    vertical: true,
    initialX: 0,
    initialY: 0,
    initialized: false,
  });
  const [submarine, setSubmarine] = useState<IInfoShip>({
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
        setCarrier((prev: IInfoShip) => ({
          ...prev,
          vertical: !prev.vertical,
        }));
        break;
      case CRUISER1_ID:
        setCruiser1((prev: IInfoShip) => ({
          ...prev,
          vertical: !prev.vertical,
        }));
        break;
      case CRUISER2_ID:
        setCruiser2((prev: IInfoShip) => ({
          ...prev,
          vertical: !prev.vertical,
        }));
        break;
      case CRUISER3_ID:
        setCruiser3((prev: IInfoShip) => ({
          ...prev,
          vertical: !prev.vertical,
        }));
        break;
      case SUBMARINE_ID:
        setSubmarine((prev: IInfoShip) => ({
          ...prev,
          vertical: !prev.vertical,
        }));
        break;
      default: break;
    }
    setCurrentShipInfo((prev: IInfoShip | null) => {
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
    }, 3000);
  }, []);

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

  const shipInGameboard = (
    ship: IInfoShip,
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

  const getShipArea = (ship: IInfoShip, translation: number[], cellSize: number): number[] => {
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

  function hasDuplicates(arr:number[]) {
    return new Set(arr).size !== arr.length;
  }

  const sendShips = () => {
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
    )) { setError({ has: true, description: 'StraightLinesFailed' }); }

    // ships in gameboard validation
    if (!shipInGameboard(carrier, carrierTranslation, gameboardWidth)) { setError({ has: true, description: 'Carrier out of gameboard' }); }
    if (!shipInGameboard(cruiser1, cruiser1Translation, gameboardWidth)) { setError({ has: true, description: 'Cruiser 1 out of gameboard' }); }
    if (!shipInGameboard(cruiser2, cruiser2Translation, gameboardWidth)) { setError({ has: true, description: 'Cruiser 2 out of gameboard' }); }
    if (!shipInGameboard(cruiser3, cruiser3Translation, gameboardWidth)) { setError({ has: true, description: 'Cruiser 3 out of gameboard' }); }
    if (!shipInGameboard(submarine, submarineTranslation, gameboardWidth)) { setError({ has: true, description: 'Submarine out of gameboard' }); }

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
    if (hasDuplicates(totalArea)) { setError({ has: true, description: 'Overlaped ships' }); }

    // if comes here then send ships to the store
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
          <EnterName id="name" name="name" placeholder="Player name" />
        </CurrentPlayer>
      </div>
    </Screen>
  );
}

export default InitialStage;
