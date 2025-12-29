import React, { useEffect } from 'react';
import './style/Alert.css'
import { CloseButton } from 'react-bootstrap';
const AlertComponent = ({ message, variant = 'success', onClose }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`alert-container alert-${variant}`}>
       <div onClick={() => onClose()} style={{cursor: 'pointer'}}>{message}</div>
    </div>
  );
};

export default AlertComponent;