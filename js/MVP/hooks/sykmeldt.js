const opprettSykmeldt = (sykmeldte, beriketeSykmeldte, forespurtKoblingId) => {
  const forespurtAnsatt = sykmeldte.data.filter((s) => s.koblingId == forespurtKoblingId)[0];
  const forespurtBeriketAnsatt = beriketeSykmeldte.data.filter((s) => s.koblingId == forespurtKoblingId)[0];

  return {
    ...forespurtAnsatt,
    ...forespurtBeriketAnsatt,
    koblingId: forespurtKoblingId,
  };
};

export const useSykmeldt = (
  sykmeldteErHentet,
  beriketeSykmeldteErHentet,
  sykmeldte,
  beriketeSykmeldte,
  forespurtKoblingId
) => {
  return sykmeldteErHentet && beriketeSykmeldteErHentet
    ? opprettSykmeldt(sykmeldte, beriketeSykmeldte, forespurtKoblingId)
    : null;
};
