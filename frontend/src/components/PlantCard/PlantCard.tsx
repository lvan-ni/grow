import React, { useState, useRef } from 'react';
import { PlantT, UpdatePlantT } from '../../type';

type PlantCardProps = {
  plant: PlantT;
  handleUpdatePlant: (id: string, updatedPlant: UpdatePlantT) => void;
  handleDeletePlant: (id: string) => void;
  setServerError: (error: string) => void;
  serverError: string;
};

const PlantCard: React.FC<PlantCardProps> = ({ plant, handleDeletePlant, handleUpdatePlant }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditButton = () => setIsEditing(true);
  const handleUpdateButton = async () => {
    const updatedPlant = {
      name: nameRef.current?.value || plant.name,
      light: lightRef.current?.value || plant.light,
      water: waterRef.current?.value || plant.water,
      note: noteRef.current?.value || plant.note,
    };
    handleUpdatePlant(plant._id, updatedPlant);
    setIsEditing(false);
  };
  const handleCancelButton = () => setIsEditing(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const lightRef = useRef<HTMLSelectElement>(null);
  const waterRef = useRef<HTMLSelectElement>(null);
  const noteRef = useRef<HTMLInputElement>(null);


  return (
    <div>
      {isEditing ? (
        <>
          <input ref={nameRef} defaultValue={plant.name} />
          <button onClick={() => handleDeletePlant(plant._id)}>Delete</button>
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
          <button onClick={handleUpdateButton}>Update</button>
          <button onClick={handleCancelButton}>Cancel</button>
        </>
      ) : (
        <>
          <h2>{plant.name}</h2>
          <button onClick={handleEditButton}>Edit</button>
          <p>Light: {plant.light}</p>
          <p>Water: {plant.water}</p>
          <p>Note: {plant.note}</p>
        </>
      )}
    </div>
  );
};

export default PlantCard;
