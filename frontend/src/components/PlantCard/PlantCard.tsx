import React, { useState, useRef } from 'react';
import { PlantT, UpdatePlantT } from '../../type';
import ConfirmCheck from '../ConfirmCheck/ConfirmCheck';

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
  const noteRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      {isEditing ? (
        <>
          <input ref={nameRef} defaultValue={plant.name} />
          <button onClick={() => setShowDeleteCheck(true)}>Delete</button>
          <select ref={lightRef} defaultValue={plant.light}>
            <option value="" disabled>Light Level</option>
            <option value="Bright Light">Bright Light</option>
            <option value="Indirect Light">Indirect Light</option>
            <option value="Low Light">Low Light</option>
          </select>
          <select ref={waterRef} defaultValue={plant.water}>
            <option value="" disabled>Water Frequency</option>
            <option value="Every 7 days">Every 7 days</option>
            <option value="Every 14 days">Every 14 days</option>
            <option value="Every 30 days">Every 30 days</option>
          </select>
          <input ref={noteRef} defaultValue={plant.note} />
          <button onClick={() => setShowUpdateCheck(true)}>Update</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h2>{plant.name}</h2>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <p>Light: {plant.light}</p>
          <p>Water: {plant.water}</p>
          <p>Note: {plant.note}</p>
        </>
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
