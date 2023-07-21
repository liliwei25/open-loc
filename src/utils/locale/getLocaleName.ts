export const getLocaleName = (locale: string, baseLocale?: string): string =>
  new Intl.DisplayNames(baseLocale ?? locale, { type: 'language' }).of(
    locale
  ) ?? locale;
