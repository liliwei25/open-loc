export const isAllUnique = <T>(arr: T[]): boolean =>
  arr.length === new Set(arr).size;
