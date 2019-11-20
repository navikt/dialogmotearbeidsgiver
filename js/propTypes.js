import PT from 'prop-types';
import * as moteplanleggerDeltakertyper from './enums/moteplanleggerDeltakerTyper';

export const sykmeldt = PT.shape({
    fnr: PT.string.isRequired,
    koblingId: PT.number.isRequired,
    navn: PT.string,
    orgnr: PT.string,
});

export const brodsmule = PT.shape({
    sti: PT.string,
    tittel: PT.string,
    sisteSmule: PT.bool,
    erKlikkbar: PT.bool,
});

const meta = PT.shape({
    error: PT.string,
    touched: PT.bool,
});

const input = PT.shape({
    name: PT.string,
    onBlur: PT.func,
    onChange: PT.func,
    onDragStart: PT.func,
    onDrop: PT.func,
    onFocus: PT.func,
});

export const fieldPropTypes = { meta, input };


export const motebehovPt = PT.shape({
    motebehovSvar: PT.shape({
        friskmeldingForventning: PT.string,
        tiltak: PT.string,
        tiltakResultat: PT.string,
        harMotebehov: PT.bool,
        forklaring: PT.string,
    }),
});

export const motebehovReducerPt = PT.shape({
    henter: PT.bool,
    hentet: PT.bool,
    hentingFeilet: PT.bool,
    data: PT.arrayOf(motebehovPt),
});


export const motebehovSvarReducerPt = PT.shape({
    sender: PT.bool,
    sendt: PT.bool,
    sendingFeilet: PT.bool,
});

export const moteplanleggerAlternativPt = PT.shape({
    id: PT.number,
    tid: PT.instanceOf(Date),
    created: PT.instanceOf(Date),
    sted: PT.string,
    valgt: PT.bool,
});

export const moteplanleggerSvarPt = PT.shape({
    id: PT.number,
    tid: PT.instanceOf(Date),
    created: PT.instanceOf(Date),
    sted: PT.string,
    valgt: PT.bool,
});

export const moteplanleggerDeltakerPt = PT.shape({
    navn: PT.string,
    orgnummer: PT.string,
    type: PT.string,
    svar: PT.arrayOf(moteplanleggerSvarPt),
    svartidspunkt: PT.instanceOf(Date),
});

export const motePt = PT.shape({
    moteUuid: PT.string,
    status: PT.string,
    fnr: PT.string,
    opprettetTidspunkt: PT.instanceOf(Date),
    bekreftetTidspunkt: PT.instanceOf(Date),
    deltakere: PT.arrayOf(moteplanleggerDeltakerPt),
    alternativer: PT.arrayOf(moteplanleggerAlternativPt),
});

export const moteplanleggerDeltakertypePt = PT.oneOf([
    moteplanleggerDeltakertyper.BRUKER,
    moteplanleggerDeltakertyper.ARBEIDSGIVER,
]);
