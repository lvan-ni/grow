import React, { useRef, useState } from 'react';
import { NewPlantT } from '../../type';
import './AddPlant.css';

type AddPlantProps = {
  handleAddPlant: (newPlant: NewPlantT) => void;
  setServerError: (error: string) => void;
  serverError: string;
};
const AddPlant: React.FC<AddPlantProps> = ({ handleAddPlant, setServerError, serverError }) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const lightRef = useRef<HTMLSelectElement>(null);
  const waterRef = useRef<HTMLSelectElement>(null);
  const noteRef = useRef<HTMLTextAreaElement>(null);
  const [inputError, setInputError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const plantName = nameRef.current?.value || '';
    const plantLight = lightRef.current?.value || '';
    const plantWater = waterRef.current?.value || '';
    const plantNote = noteRef.current?.value + ` - ${new Date().toDateString()}`;

    if (!plantName) {
      setInputError('Please name your plant');
      return;
    }
    if (!plantLight) {
      setInputError('Please choose light level for yout plant');
      return;
    }
    if (!plantWater) {
      setInputError('Please choose water frequency for yout plant');
      return;
    }

    const newPlant: NewPlantT = {
      name: plantName,
      light: plantLight,
      water: plantWater,
      note: plantNote,
    };
    handleAddPlant(newPlant);

    if (nameRef.current) {
      nameRef.current.value = '';
    }
    if (lightRef.current) {
      lightRef.current.value = '';
    }
    if (waterRef.current) {
      waterRef.current.value = '';
    }
    if (noteRef.current) {
      noteRef.current.value = '';
    }

    setServerError('');
    setInputError('');
  };

  const enterKey = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-plant__form">
      <h2 className="add-plant__title">Add Plant</h2>
      <section className="form__error">
        {serverError && <span>{serverError}</span>}
        {inputError && <span>{inputError}</span>}
      </section>
      <input ref={nameRef} placeholder="Name your plant" className="form__input-name" onKeyDown={enterKey}/>
      <select ref={lightRef} defaultValue="" required className="form_input-select" onKeyDown={enterKey}>
        <option value="" disabled className='select-light'>
          Light level
        </option>
        <option value="Bright Light">Bright light</option>
        <option value="Indirect Light">Indirect light</option>
        <option value="Low Light">Low light</option>
      </select>
      <select ref={waterRef} defaultValue="" required className="form_input-select" onKeyDown={enterKey}>
        <option value="" disabled className='select-water'>
          Water frequency
        </option>
        <option value="Every 7 days">Every 7 days</option>
        <option value="Every 14 days">Every 14 days</option>
        <option value="Every 30 days">Every 30 days</option>
      </select>
      <textarea
        ref={noteRef}
        placeholder="Write anything to help you keep track"
        className="form__note"
      />
      <input type="submit" value="Add" className="form__button-addplant"/>
    </form>
  );
};

export default AddPlant;
