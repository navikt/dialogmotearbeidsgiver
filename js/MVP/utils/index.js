import { format } from 'date-fns';
import { getBrevPdf } from '../services/brev';

export const downloadBrevPdf = async (uuid, dokumentNavn) => {
  const data = await getBrevPdf(uuid);
  const blob = await data.blob();

  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${dokumentNavn || 'referat'}.pdf`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

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

export const minutesToMillis = (minutes) => {
  return 1000 * 60 * minutes;
};
