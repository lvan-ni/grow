import React from 'react';
import { PlantT } from '../../type';

type PlantCardProps = {
  plant: PlantT;
  handleUpdatePlant: (id: string, updatedPlant: PlantT) => void,
  handleRemovePlant: (id: string) => void,
  setServerError: (error: string) => void,
  serverError: string,
}

const PlantCard: React.FC<PlantCardProps> = ({ plant }) => {
  const updatePlant = async () => {

  };
  const deletePlant = async () => {
  };



  return (
    <div>
      <h2>{plant.name}</h2>
      <p>Light: {plant.light}</p>
      <p>Water: {plant.water}</p>
      <p>Note: {plant.note}</p>
      <button onClick={deletePlant}>Delete</button>
      <button onClick={updatePlant}>Update</button>
    </div>
  );
};

export default PlantCard;
