import React, { memo } from 'react';
import { CellContainer } from './gameboardStyles';

const getStateFromIndicators = (
  flagOwnCell: boolean,
  flagDestroyedCell: boolean,
  flagHittedCell: boolean,
  flagMissedCell: boolean,
) => {
  if (flagDestroyedCell) return 'destroyed';
  if (flagHittedCell) return 'hitted';
  if (flagOwnCell) return 'own';
  if (flagMissedCell) return 'missed';
  return 'none';
};

interface ICellProps {
  isOwn: boolean;
  isDestroyed: boolean;
  isHitted: boolean;
  isMissed: boolean;
}

function Cell({
  isOwn, isDestroyed, isHitted, isMissed,
}: ICellProps) {
  return (
    <CellContainer state={getStateFromIndicators(isOwn, isDestroyed, isHitted, isMissed)} />
  );
}

export default memo(Cell);
