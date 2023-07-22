import React, { useState, useRef } from 'react';
import { PlantT, UpdatePlantT } from '../../type';
import ConfirmCheck from '../ConfirmCheck/ConfirmCheck';
import './PlantCard.css';

type PlantCardProps = {
  plant: PlantT;
  handleUpdatePlant: (id: string, updatedPlant: UpdatePlantT) => void;
  handleDeletePlant: (id: string) => void;
  setServerError: (error: string) => void;
  serverError: string;
};

const PlantCard: React.FC<PlantCardProps> = ({ plant, handleDeletePlant, handleUpdatePlant }) => {
  const [showDeleteCheck, setShowDeleteCheck] = useState(false);
  const [showUpdateCheck, setShowUpdateCheck] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleDeleteConfirmed = () => {
    handleDeletePlant(plant._id);
    setShowDeleteCheck(false);
  };

  const handleUpdateConfirmed = () => {
    const updatedPlant = {
      ...plant,
      name: nameRef.current?.value || '',
      light: lightRef.current?.value || '',
      water: waterRef.current?.value || '',
      note: noteRef.current?.value || ''
    };
    handleUpdatePlant(plant._id, updatedPlant);
    setIsEditing(false);
    setShowUpdateCheck(false);
  };

  const nameRef = useRef<HTMLInputElement>(null);
  const lightRef = useRef<HTMLSelectElement>(null);
  const waterRef = useRef<HTMLSelectElement>(null);
  const noteRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div>
      {isEditing ? (

        <div className='card__container'>

          <div className='card__header'>
            <div className='card__title-contianer'>
              <input className='card__name' ref={nameRef} defaultValue={plant.name} />
              <div className='card__titlebtn'>
                <button className='card__deletebtn' onClick={() => setShowDeleteCheck(true)}>Delete</button>
              </div>
          </div>
          </div>

          <div className='card__body'>
            <div className='select-group'>
              <select className='card__light ' ref={lightRef} defaultValue={plant.light}>
                <option value="" disabled>Light level</option>
                <option value="Bright Light">Bright light</option>
                <option value="Indirect Light">Indirect light</option>
                <option value="Low Light">Low light</option>
              </select>
              <select className='card__water' ref={waterRef} defaultValue={plant.water}>
                <option value="" disabled>Water frequency</option>
                <option value="Every 7 days">Every 7 days</option>
                <option value="Every 14 days">Every 14 days</option>
                <option value="Every 30 days">Every 30 days</option>
              </select>
            </div>
            <div className='card__note-container'>
              <textarea className='card__note' ref={noteRef} defaultValue={plant.note} />
            </div>
          </div>

          <div className='card__footer'>
            <button className='card__updatebtn' onClick={() => setShowUpdateCheck(true)}>Update</button>
            <button className='card__cancelbtn' onClick={() => setIsEditing(false)}>Cancel</button>
          </div>

        </div>

      ) : (

        <div className='card__container'>

          <div className='card__header'>
            <div className='card__title-contianer'>
              <h4 className='card__name'>{plant.name}</h4>
              <div className='card__titlebtn'>
                <button className='card__editbtn'onClick={() => setIsEditing(true)}>Edit</button>
              </div>
            </div>
          </div>
          <div className='card__body'>
            <div className='select-group'>
              <p className='card__light' >Light: {plant.light}</p>
              <p className='card__water' >Water: {plant.water}</p>
            </div>
            <div className='card__note-container'>
              <p className='card__note' >Note: {plant.note}</p>
            </div>
          </div>
        </div>

      )}

      <ConfirmCheck
        isOpen={showDeleteCheck}
        title="Are you sure ?"
        message="Once you delete the plant, you can not restore it."
        onConfirm={handleDeleteConfirmed}
        onCancel={() => setShowDeleteCheck(false)}
        confirmButtonText="Yes, I'm sure"
      />
      <ConfirmCheck
        isOpen={showUpdateCheck}
        title="Confirm update"
        message="Once update is confirmed, the changes can not be reverted."
        onConfirm={handleUpdateConfirmed}
        onCancel={() => setShowUpdateCheck(false)}
        confirmButtonText="Confirm"
      />
    </div>
  );
};

export default PlantCard;
