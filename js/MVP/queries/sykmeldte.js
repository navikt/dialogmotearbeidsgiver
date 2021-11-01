import { useQuery } from 'react-query';
import { get } from '@/api/axios';
import { getSykmeldteUrl, getSykmeldtPaDatoUrl } from '../globals/paths';

const SYKMELDTE = 'sykmeldte';
const SYKMELDT_I_DAG = 'sykmeldt_i_dag';

export const useSykmeldte = (narmestelederId) => {
  return useQuery(SYKMELDTE, async () => {
    const url = getSykmeldteUrl(narmestelederId);
    return get(url);
  });
};

export const useSykmeldtPaDato = (narmestelederId) => {
  return useQuery(SYKMELDT_I_DAG, async () => {
    var dato = new Date().toISOString();
    const url = getSykmeldtPaDatoUrl(narmestelederId, dato);
    return get(url);
  });
};
