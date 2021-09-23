import { useBerikSykmeldte, useSykmeldte } from './sykmeldte';

const opprettSykmeldt = (sykmeldte, beriketeSykmeldte, forespurtKoblingId) => {
  const forespurtAnsatt = sykmeldte.data.filter((s) => s.koblingId == forespurtKoblingId)[0];
  const forespurtBeriketAnsatt = beriketeSykmeldte.data.filter((s) => s.koblingId == forespurtKoblingId)[0];

  return {
    ...forespurtAnsatt,
    ...forespurtBeriketAnsatt,
    koblingId: forespurtKoblingId,
    isLoading: false,
  };
};

export const useSykmeldt = (forespurtKoblingId) => {
  const sykmeldte = useSykmeldte();
  const beriketeSykmeldte = useBerikSykmeldte(sykmeldte.isSuccess, sykmeldte);

  if (sykmeldte.isLoading || beriketeSykmeldte.isLoading) {
    return { isLoading: true };
  }

  return sykmeldte.isSuccess && beriketeSykmeldte.isSuccess
    ? opprettSykmeldt(sykmeldte, beriketeSykmeldte, forespurtKoblingId)
    : null;
};