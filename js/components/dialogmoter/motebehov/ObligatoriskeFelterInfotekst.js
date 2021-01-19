import React from 'react';

const obligatoriskeFelter = 'I utgangspunktet må alle feltene være utfylt for å kunne gå videre. Når noen felt er frivillige å fylle ut, har vi markert dem med "valgfri".';

const ObligatoriskeFelterInfotekst = () => {
    return (
        <p>{obligatoriskeFelter}</p>
    );
};

export default ObligatoriskeFelterInfotekst;
