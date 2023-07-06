import React, { useRef, useState } from 'react';
import { NewPlantT } from '../../type';

type AddPlantProps = {
  handleAddPlant: (newPlant: NewPlantT) => void,
  setServerError: (error: string) => void,
  serverError: string,
}


const AddPlant: React.FC<AddPlantProps> = ({ handleAddPlant, setServerError, serverError}) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const lightRef = useRef<HTMLSelectElement>(null);
  const waterRef = useRef<HTMLSelectElement>(null);
  const [inputError, setInputError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const newPlant: NewPlantT = {
      name: nameRef.current?.value || '',
      light: lightRef.current?.value || '',
      water: waterRef.current?.value || '',
      note: "Added on " + new Date().toDateString()
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
        <option value="Direct">Direct Light</option>
        <option value="Indirect">Indirect Light</option>
        <option value="Shade">Shade</option>
      </select>
      <select ref={waterRef}>
        <option value="Daily">Every day</option>
        <option value="Every other day">Every other day</option>
        <option value="Weekly">Weekly</option>
      </select>
      <input type='submit' value='Add' />
    </form>
  )
  
  
};

export default AddPlant;