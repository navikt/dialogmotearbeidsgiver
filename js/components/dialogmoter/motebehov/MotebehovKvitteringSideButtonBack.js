import React from 'react';
import { useParams } from 'react-router-dom';

const MotebehovKvitteringSideButtonBack = () => {
  const { narmestelederId } = useParams();

  return (
    <div className="knapperad">
      <a href={`${process.env.REACT_APP_CONTEXT_ROOT}/${narmestelederId}`} className="lenke">
        Tilbake
      </a>
    </div>
  );
};

export default MotebehovKvitteringSideButtonBack;
