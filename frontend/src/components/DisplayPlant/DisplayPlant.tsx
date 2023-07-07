import React from 'react';
import { PlantT, UpdatePlantT } from '../../type';
import PlantCard from '../PlantCard/PlantCard';
import './DisplayPlant.css';

type DisplayPlantProps = {
  plants: PlantT[];
  handleUpdatePlant: (id: string, updatedPlant: UpdatePlantT) => void;
  handleDeletePlant: (id: string) => void;
  setServerError: (error: string) => void;
  serverError: string;
};
const DisplayPlant: React.FC<DisplayPlantProps> = ({
  plants,
  handleUpdatePlant,
  handleDeletePlant,
  setServerError,
  serverError,
}) => {
  return (
    <div className='display-container'>
      <h2 className='display-title'>My Plants</h2>
      {plants.map((plant: PlantT, index) => (
        <PlantCard
          key={`${index}-${plant}`}
          plant={plant}
          handleUpdatePlant={handleUpdatePlant}
          handleDeletePlant={handleDeletePlant}
          setServerError={setServerError}
          serverError={serverError}
        />
      ))}
    </div>
  );
};

export default DisplayPlant;
