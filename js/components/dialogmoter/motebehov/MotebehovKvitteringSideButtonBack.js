import React from 'react';
import { Link } from 'react-router';

const MotebehovKvitteringSideButtonBack = () => {
    return (
        <div className="knapperad">
            <Link className="lenke" to={window.location.href.split('/behov')[0]}>
                Tilbake
            </Link>
        </div>
    );
};

export default MotebehovKvitteringSideButtonBack;
