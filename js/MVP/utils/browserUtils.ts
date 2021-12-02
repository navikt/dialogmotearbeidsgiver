import { getBrevPdf } from '../services/brev';

export const downloadBrevPdf = async (uuid: string, dokumentDato: string, pdfType = 'brev') => {
  const blob = await getBrevPdf(uuid);

  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${dokumentDato}_${pdfType}.pdf`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
