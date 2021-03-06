import isToday from '../isToday';

export const formatterCache: Record<string, Intl.DateTimeFormat> = {};

interface DateTimeFormatOptions {
  localeMatcher?: string;
  weekday?: string;
  era?: string;
  year?: string;
  month?: string;
  day?: string;
  hour?: string;
  minute?: string;
  second?: string;
  timeZoneName?: string;
  formatMatcher?: string;
  hour12?: boolean;
  timeZone?: string;
}

export function getFormatter(
  locale: string,
  options: DateTimeFormatOptions,
): Intl.DateTimeFormat {
  const key = JSON.stringify([locale, options]);
  if (!formatterCache[key]) {
    formatterCache[key] = new Intl.DateTimeFormat(locale, { ...options });
  }
  return formatterCache[key];
}

export const DEFAULT_DATE_TIME_OPTIONS = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: false,
};

export const DEFAULT_DATE_OPTIONS = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
};

export const DEFAULT_TIME_OPTIONS = {
  hour: 'numeric',
  minute: 'numeric',
  hour12: false,
};

export default function getIntlDateTimeFormatter({
  dateTimeOptions = DEFAULT_DATE_TIME_OPTIONS,
  dateOptions = DEFAULT_DATE_OPTIONS,
  timeOptions = DEFAULT_TIME_OPTIONS,
} = {}) {
  return ({
    utcTimestamp,
    locale,
    type = isToday(utcTimestamp) ? 'time' : 'date',
  }: DateTimeFormatterParams) => {
    if (!utcTimestamp) {
      console.warn('timestamp should not be empty');
      return null;
    }
    switch (type) {
      case 'date':
        return getFormatter(locale, dateOptions)
          .format(new Date(utcTimestamp))
          .replace(/\u200E|\u200F/g, ''); // FIX: https://github.com/tc39/ecma402/issues/28
      case 'time':
        return getFormatter(locale, timeOptions).format(new Date(utcTimestamp));
      default:
        return getFormatter(locale, dateTimeOptions).format(
          new Date(utcTimestamp),
        );
    }
  };
}

export type DateTimeFormatter = ReturnType<typeof getIntlDateTimeFormatter>;

export type DateTimeFormatterParams = {
  utcTimestamp: any;
  locale: string;
  type?: 'datetime' | 'time' | 'date';
};
