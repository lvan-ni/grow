import React, { useRef, useState } from 'react';
import { NewPlantT } from '../../type';
import './AddPlant.css';

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

    if (lightRef === null) {
      setInputError('Please choose light level for yout plant');
      return;
    }
    if (waterRef === null) {
      setInputError('Please choose water frequency for yout plant');
      return;
    }

    setServerError('');
    setInputError('');
  };

  return (
    <form onSubmit={handleSubmit} className='add-plant__form'>
      <h2 className='add-plant__title'>Add Plant</h2>
      <section className='form__error'>
      {serverError && <span>{serverError}</span>}
      {inputError && <span>{inputError}</span>}
      </section>
      {/* <section className='form__input-field'> */}
      <input ref={nameRef} placeholder="Plant name" className='form__input-name'/>
      {/* </section> */}
      {/* <section className='form__select-field'> */}
      <select ref={lightRef} defaultValue="" required className='form_input-select'>
        <option value="" disabled>Light Level</option>
        <option value="Bright Light">Bright Light</option>
        <option value="Indirect Light">Indirect Light</option>
        <option value="Low Light">Low Light</option>
      </select>
      {/* </section> */}
      {/* <section className='form__select-field'> */}
      <select ref={waterRef} defaultValue="" required className='form_input-select'>
        <option value="" disabled>Water Frequency</option>
        <option value="Every 7 days">Every 7 days</option>
        <option value="Every 14 days">Every 14 days</option>
        <option value="Every 30 days">Every 30 days</option>
      </select>
      {/* </section> */}
      {/* <section className='form__input-field'> */}
      <input ref={noteRef} placeholder='Add note' className='form__note'/>
      {/* </section> */}
      <input type='submit' value='Add' className='form__button-addplant'/>
    </form>
  )
};

export default AddPlant;