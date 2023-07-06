import React from 'react';

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
    <div>
      <div>
        <h2>{title}</h2>
        <p>{message}</p>
        <button onClick={onConfirm}>{confirmButtonText}</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default ConfirmCheck;
