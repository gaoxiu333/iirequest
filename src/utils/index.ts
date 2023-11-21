const toNumber = (value: any) => {
  if (value instanceof Date) {
    return value.getTime();
  }

  if (typeof value === "number" || value === null || value === undefined) {
    return value;
  }
  return Number(value);
};

const isWithin = (min: number, max: number, value: number): boolean =>
  value >= min && value <= max;

const isPromise = (obj: any) =>
  !!obj &&
  (typeof obj === "object" || typeof obj === "function") &&
  typeof obj.then === "function";

export { toNumber, isWithin, isPromise };
