export const isMultiple = (value: number, reference: number): boolean => {
  const remainder = value % reference;
  if (remainder === 0) {
    return true;
  }
  return false;
};

export const getMovementCoordinatesFromCss = (value: string): number[] => {
  const regexp = /(\d+)px, (\d+)/g;
  return [+[...value.matchAll(regexp)][0][1],
    +[...value.matchAll(regexp)][0][2]];
};

export const hasDuplicates = (arr: number[]) => new Set(arr).size !== arr.length;

export const isValidName = (name: string): boolean => {
  if (/^[a-zA-Z\s]+$/.test(name)) {
    return true;
  }
  return false;
};
