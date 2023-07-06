import React from 'react';
import { PlantT } from '../../type';
import PlantCard from '../PlantCard/PlantCard';

type DisplayPlantProps = {
  plants: PlantT[];
  handleUpdatePlant: (id: string, updatedPlant: PlantT) => void,
  handleRemovePlant: (id: string) => void,
  setServerError: (error: string) => void,
  serverError: string,
}

const DisplayPlant: React.FC<DisplayPlantProps> = ({ plants, handleUpdatePlant, handleRemovePlant, setServerError, serverError }) => {
  return (
    <div>
      {plants.map((plant: PlantT) => (
        <PlantCard 
          key={plant._id} 
          plant={plant} 
          handleUpdatePlant={handleUpdatePlant} 
          handleRemovePlant={handleRemovePlant}
          setServerError={setServerError}
          serverError={serverError}
        />
      ))}
    </div>
  );
};

export default DisplayPlant;
