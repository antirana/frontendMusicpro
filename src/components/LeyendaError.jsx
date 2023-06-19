import React from 'react';

const LeyendaError = ({ showError, mensaje }) => {
  return (
    <p style={{ fontSize: '12px', marginBottom: '0', color: 'red', display: showError ? 'block' : 'none' }}>
      {mensaje}
    </p>
  );
};

export default LeyendaError;
