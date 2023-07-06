import React, { useRef, useState } from 'react';
import { NewPlantT } from '../../type';

type AddPlantProps = {
  handleAddPlant: (newPlant: NewPlantT) => void,
  setServerError: (error: string) => void,
  serverError: string,
};
const AddPlant: React.FC<AddPlantProps> = ({ handleAddPlant, setServerError, serverError}) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const lightRef = useRef<HTMLSelectElement>(null);
  const waterRef = useRef<HTMLSelectElement>(null);
  const noteRef = useRef<HTMLInputElement>(null);
  const [inputError, setInputError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newPlant: NewPlantT = {
      name: nameRef.current?.value || '',
      light: lightRef.current?.value || '',
      water: waterRef.current?.value || '',
      note: noteRef.current?.value + ` - ${new Date().toDateString()}`,
    };
    handleAddPlant(newPlant);

    setServerError('');
    setInputError('');
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2 className='add-plant__title'>Add Plant</h2>
      {serverError && <span>{serverError}</span>}
      {inputError && <span>{inputError}</span>}
      <input ref={nameRef} placeholder="Plant name" />
      <select ref={lightRef}>
        <option value="" disabled>Light Level</option>
        <option value="Bright Light">Bright Light</option>
        <option value="Indirect Light">Indirect Light</option>
        <option value="Low Light">Low Light</option>
      </select>
      <select ref={waterRef}>
        <option value="" disabled>Water Frequency</option>
        <option value="Every 7 days">Every 7 days</option>
        <option value="Every 14 days">Every 14 days</option>
        <option value="Every 30 days">Every 30 days</option>
      </select>
      <input ref={noteRef} placeholder='Add note' />
      <input type='submit' value='Add' />
    </form>
  )
};

export default AddPlant;