const motebehovSvar = {
    arbeidstakerFnr: '02020212345',
    opprettetAv: '',
    virksomhetsnummer: '000111222',
    motebehovSvar: {
        harMotebehov: true,
    },
};

const motebehovStatusMeldBehov = {
    visMotebehov: true,
    skjemaType: 'MELD_BEHOV',
    motebehov: null,
};
const motebehovStatusMeldBehovSvar = {
    visMotebehov: true,
    skjemaType: 'MELD_BEHOV',
    motebehov: motebehovSvar,
};

const motebehovStatusSvarUnavailable = {
    visMotebehov: true,
    skjemaType: 'SVAR_BEHOV',
    motebehov: null,
};

const motebehovStatusSvarBehov = {
    visMotebehov: true,
    skjemaType: 'SVAR_BEHOV',
    motebehov: null,
};
const motebehovStatusSvarBehovSvar = {
    visMotebehov: true,
    skjemaType: 'SVAR_BEHOV',
    motebehov: motebehovSvar,
};

const motebehovStatusEnum = {
    MELD_BEHOV: 'MELD_BEHOV',
    MELD_BEHOV_SVAR: 'MELD_BEHOV_SVAR',
    SVAR_BEHOV: 'SVAR_BEHOV',
    SVAR_BEHOV_SVAR: 'SVAR_BEHOV_SVAR',
};

function getMotebehovStatus(type) {
    switch (type) {
        case motebehovStatusEnum.MELD_BEHOV: {
            return motebehovStatusMeldBehov;
        }
        case motebehovStatusEnum.MELD_BEHOV_SVAR: {
            return motebehovStatusMeldBehovSvar;
        }
        case motebehovStatusEnum.SVAR_BEHOV: {
            return motebehovStatusSvarBehov;
        }
        case motebehovStatusEnum.SVAR_BEHOV_SVAR: {
            return motebehovStatusSvarBehovSvar;
        }
        default: {
            return motebehovStatusSvarUnavailable;
        }
    }
}


const mockSyfomotebehov = (server) => {
    server.get('/syfomotebehov/api/v2/motebehov', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(getMotebehovStatus(motebehovStatusEnum.MELD_BEHOV)));
    });
};

module.exports = mockSyfomotebehov;
