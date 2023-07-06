import React from 'react';
import { PlantT, UpdatePlantT } from '../../type';
import PlantCard from '../PlantCard/PlantCard';

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
    <div>
      {plants.map((plant: PlantT) => (
        <PlantCard
          key={plant.name + plant.name.length}
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
