const sykmeldt = {
    navn: 'Postmann Pat',
    fnr: '01234567891',
    orgnr: '81549300',
    koblingId: 123,
    harNySykmelding: true,
};

const mockSykmeldt = (s = {}) => {
    return Object.assign({}, sykmeldt, s);
};

export default mockSykmeldt;
