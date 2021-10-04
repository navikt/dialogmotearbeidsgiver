import { useBerikSykmeldte, useSykmeldte } from './sykmeldte';

const opprettSykmeldt = (sykmeldte, beriketeSykmeldte, forespurtKoblingId) => {
  const forespurtAnsatt = sykmeldte.data.find((s) => s.koblingId.toString() === forespurtKoblingId);
  const forespurtBeriketAnsatt = beriketeSykmeldte.data.find((s) => s.koblingId.toString() === forespurtKoblingId);

  console.log('forespurtAnsatt', forespurtAnsatt);
  console.log('forespurtBeriketAnsatt', forespurtBeriketAnsatt);
  console.log('sykmeldte', sykmeldte);
  console.log('beriketeSykmeldte', beriketeSykmeldte);
  console.log('forespurtKoblingId', forespurtKoblingId);

  if (forespurtAnsatt && forespurtBeriketAnsatt) {
    return {
      ...forespurtAnsatt,
      ...forespurtBeriketAnsatt,
      koblingId: forespurtKoblingId,
      isLoading: false,
      isError: false,
    };
  }
  return null;
};

export const useSykmeldt = (forespurtKoblingId) => {
  const sykmeldte = useSykmeldte();
  const beriketeSykmeldte = useBerikSykmeldte(sykmeldte.isSuccess, sykmeldte);

  if (sykmeldte.isLoading || beriketeSykmeldte.isLoading) {
    return { isLoading: true, isError: false };
  }

  if (sykmeldte.isError || beriketeSykmeldte.isError) {
    return { isLoading: false, isError: true };
  }

  return sykmeldte.isSuccess && beriketeSykmeldte.isSuccess
    ? opprettSykmeldt(sykmeldte, beriketeSykmeldte, forespurtKoblingId)
    : null;
};
