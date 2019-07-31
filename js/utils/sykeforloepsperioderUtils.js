export const harSykeforlopsPerioderHenter = (fnr, virksomhetsnummer, sykeforlopsPerioder) => {
    return sykeforlopsPerioder.henter && sykeforlopsPerioder.henter.filter((henter) => {
        return henter.fnr === fnr && henter.virksomhetsnummer === virksomhetsnummer;
    }).length > 0;
};

export const harSykeforlopsPerioderHentet = (fnr, virksomhetsnummer, sykeforlopsPerioder) => {
    return sykeforlopsPerioder.hentet && sykeforlopsPerioder.hentet.filter((hentet) => {
        return hentet.fnr === fnr && hentet.virksomhetsnummer === virksomhetsnummer;
    }).length > 0;
};

export const harSykeforlopsPerioderHentingFeilet = (fnr, virksomhetsnummer, sykeforlopsPerioder) => {
    return sykeforlopsPerioder.hentingFeilet && sykeforlopsPerioder.hentingFeilet.filter((hentingFeilet) => {
        return hentingFeilet.fnr === fnr && hentingFeilet.virksomhetsnummer === virksomhetsnummer;
    }).length > 0;
};

export const finnSykmeldtSykeforlopsPerioderData = (fnr, virksomhetsnummer, sykeforlopsPerioder) => {
    return sykeforlopsPerioder.data && sykeforlopsPerioder.data.filter((data) => {
        return data.fnr === fnr && data.virksomhetsnummer === virksomhetsnummer;
    })[0];
};

export const forsoektHentetSykmeldtsSykeforlopsPerioder = (sykeforlopsPerioder) => {
    return sykeforlopsPerioder.hentet || sykeforlopsPerioder.hentingFeilet;
};

export const henterEllerHarForsoektHentetSykmeldtsSykeforlopsPerioder = (sykeforlopsPerioder) => {
    return sykeforlopsPerioder.henter || forsoektHentetSykmeldtsSykeforlopsPerioder(sykeforlopsPerioder);
};

export const finnSykmeldtsSykeforlopsPeriode = (sykmeldt, sykeforlopsPerioder) => {
    if (!sykmeldt) {
        return {};
    }
    const sykmeldtFnr = sykmeldt.fnr;
    const sykmeldtOrgnr = sykmeldt.orgnummer;
    return {
        henter: harSykeforlopsPerioderHenter(sykmeldtFnr, sykmeldtOrgnr, sykeforlopsPerioder),
        hentet: harSykeforlopsPerioderHentet(sykmeldtFnr, sykmeldtOrgnr, sykeforlopsPerioder),
        hentingFeilet: harSykeforlopsPerioderHentingFeilet(sykmeldtFnr, sykmeldtOrgnr, sykeforlopsPerioder),
        data: finnSykmeldtSykeforlopsPerioderData(sykmeldtFnr, sykmeldtOrgnr, sykeforlopsPerioder),
    };
};
