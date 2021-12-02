import { format } from 'date-fns';

export const getProgrammaticDateFormat = (date: string | number | Date) => {
  return format(new Date(date), 'dd-MM-yyyy');
};

export const getLongDateFormat = (date: string | number | Date) => {
  const dateObject = new Date(date);

  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return dateObject.toLocaleDateString('nb-NO', options);
};

export const getFullDateFormat = (date: string | number | Date) => {
  const dateObject = new Date(date);

  const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return dateObject.toLocaleDateString('nb-NO', options);
};

export const isDateInPast = (dateTime: string | number | Date) => {
  const date = new Date(dateTime);
  const today = new Date();

  return today > date;
};

export const minutesToMillis = (minutes: number) => {
  return 1000 * 60 * minutes;
};
