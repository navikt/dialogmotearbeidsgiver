const parsedato = (dato) => {
    const datoSplit = dato.split('.');
    let ar = datoSplit[2];
    if (ar.length === 2) {
        ar = `20${ar}`;
    }
    return `${ar}-${datoSplit[1]}-${datoSplit[0]}`;
};

export const fraInputdatoTilJSDato = (inputDato) => {
    const d = parsedato(inputDato);
    return new Date(d);
};

const tilDatePeriode = (periode) => {
    let fom;
    let tom;
    try {
        fom = fraInputdatoTilJSDato(periode.fom);
    } catch (e) {
        fom = periode.fom;
    }
    try {
        tom = fraInputdatoTilJSDato(periode.tom);
    } catch (e) {
        tom = periode.tom;
    }
    return { fom, tom };
};

export const tidligsteFom = (perioder) => {
    return perioder
        .map((p) => {
            return p.fom;
        })
        .sort((p1, p2) => {
            if (p1 > p2) {
                return 1;
            } else if (p1 < p2) {
                return -1;
            } return 0;
        })[0];
};

export const senesteTom = (perioder) => {
    return perioder
        .map((p) => {
            return p.tom;
        })
        .sort((p1, p2) => {
            if (p1 < p2) {
                return 1;
            } else if (p1 > p2) {
                return -1;
            } return 0;
        })[0];
};


export const periodeOverlapperMedPeriode = (periodeA_, periodeB_) => {
    const periodeA = tilDatePeriode(periodeA_);
    const periodeB = tilDatePeriode(periodeB_);
    try {
        const forstePeriode = periodeA.fom.getTime() < periodeB.fom.getTime() ? periodeA : periodeB;
        const andrePeriode = periodeA.fom.getTime() < periodeB.fom.getTime() ? periodeB : periodeA;
        return forstePeriode.tom.getTime() >= andrePeriode.fom.getTime();
    } catch (e) {
        return false;
    }
};

export const sorterPerioder = (perioder) => {
    return [...perioder]
        .sort((a, b) => { return a.tom - b.tom; });
};
