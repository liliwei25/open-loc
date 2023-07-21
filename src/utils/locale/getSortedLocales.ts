export const getSortedLocales = (locales: string[]): string[] =>
  locales.sort((a, b) => {
    if (a === import.meta.env.VITE_DEFAULT_LOCALE) {
      return -1;
    }
    if (b === import.meta.env.VITE_DEFAULT_LOCALE) {
      return 1;
    }
    return a.localeCompare(b);
  });
