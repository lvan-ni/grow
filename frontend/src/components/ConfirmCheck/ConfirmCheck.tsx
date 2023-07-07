import React from 'react';
import './ConfirmCheck.css';

type ConfirmCheckProps = {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmButtonText: string;
};

const ConfirmCheck: React.FC<ConfirmCheckProps> = ({ isOpen, title, message, onConfirm, onCancel, confirmButtonText }) => {
  if (!isOpen) {
    return null;
  }

  return (
      <div className="confirmation-card">
        <div className="card-content">
          <h3>{title}</h3>
          <p>{message}</p>
          <div className='card-footer'>
            <button onClick={onConfirm} className='confirm__confirmbtn'>{confirmButtonText}</button>
            <button onClick={onCancel} className='confirm__cancelbtn'>Cancel</button>
          </div>
        </div>
      </div>
  );
};

export default ConfirmCheck;
