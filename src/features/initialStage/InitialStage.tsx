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

interface ShipShapeProps {
  vertical: boolean;
  size: number;
}

function getMovementCoordinatesFromCss(value: string): number[] {
  const regexp = /(\d+)px, (\d+)/g;
  return [+[...value.matchAll(regexp)][0][1],
    +[...value.matchAll(regexp)][0][2]];
}

const isMultiple = (value: number, reference: number): boolean => {
  const remainder = value % reference;
  if (remainder === 0) {
    return true;
  }
  return false;
};

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
  const carrier1Ref = React.useRef<HTMLDivElement>(null);
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

  const shipsStraightLinesValidation = (cellSize: number) => {
    const carrierTransformStyle: string = document.getElementById(CARRIER_ID)?.getAttribute('style') || '';
    const cruiser1TransformStyle: string = document.getElementById(CRUISER1_ID)?.getAttribute('style') || '';
    const cruiser2TransformStyle: string = document.getElementById(CRUISER2_ID)?.getAttribute('style') || '';
    const cruiser3TransformStyle: string = document.getElementById(CRUISER3_ID)?.getAttribute('style') || '';
    const submarineTransformStyle: string = document.getElementById(SUBMARINE_ID)?.getAttribute('style') || '';
    let valid: boolean = true;
    const allTranslations:number[] = [
      ...getMovementCoordinatesFromCss(carrierTransformStyle),
      ...getMovementCoordinatesFromCss(cruiser1TransformStyle),
      ...getMovementCoordinatesFromCss(cruiser2TransformStyle),
      ...getMovementCoordinatesFromCss(cruiser3TransformStyle),
      ...getMovementCoordinatesFromCss(submarineTransformStyle)];
    allTranslations.map((translation) => {
      if (!isMultiple(translation, cellSize)) {
        valid = false;
      }
      return 0;
    });
    return valid;
  };

  const sendShips = () => {
    const CELL_SIZE = (getGameboardWidthFromDOM() - (2 * GAMEBOARD_BORDER)) / BOARD_SIZE;
    // ships in bounds validation
    if (!shipsStraightLinesValidation(CELL_SIZE)) { setError({ has: true, description: 'StraightLinesFailed' }); }
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
                  ref={carrier1Ref}
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
