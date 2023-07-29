import { isNotNil } from '../typeGuards/isNotNil.ts';

export const isDefaultLocale = (locale: string | undefined | null): boolean =>
  isNotNil(locale) && locale === import.meta.env.VITE_DEFAULT_LOCALE;
