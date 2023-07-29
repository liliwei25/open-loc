import { isDefaultLocale } from './isDefaultLocale.ts';

export const getSortedLocales = (locales: string[]): string[] =>
  locales.sort((a, b) => {
    if (isDefaultLocale(a)) {
      return -1;
    }
    if (isDefaultLocale(b)) {
      return 1;
    }
    return a.localeCompare(b);
  });
