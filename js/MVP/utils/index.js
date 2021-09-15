import { format } from 'date-fns';

export const getProgrammaticDateFormat = (date) => {
  return format(new Date(date), 'dd-MM-yyyy');
};

export const getLongDateFormat = (date) => {
  const dateObject = new Date(date);

  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return dateObject.toLocaleDateString('nb-NO', options);
};

export const getFullDateFormat = (date) => {
  const dateObject = new Date(date);

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return dateObject.toLocaleDateString('nb-NO', options);
};

export const isDateInPast = (dateTime) => {
  const date = new Date(dateTime);
  const today = new Date();

  return today > date;
};
