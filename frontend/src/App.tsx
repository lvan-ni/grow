import { useState, useEffect } from 'react';
import { PlantT, NewPlantT } from './type';
import AddPlant from './components/AddPlant/AddPlant';
import DisplayPlant from './components/DisplayPlant/DisplayPlant';
import axios from 'axios';

const App = () => {
  const [plants, setPlants] = useState<PlantT[]>([]);
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    (async () => {
      const URL = 'http://localhost:3000/api/plants';
      try {
        const response = await axios.get(URL);
        const allPlants = response.data;
        setPlants(allPlants);
      } catch (error) {
        setServerError('Error fetching the plants');
      }
    })();
  }, []);

  const handleAddPlant = async (newPlant: NewPlantT) => {
    const URL = 'http://localhost:3000/plants';
    try {
      const response = await axios.post(URL, newPlant);
      const addedPlant = response.data.plants;
      setPlants(existingPlants => [...existingPlants, addedPlant]);
    } catch (error) {
      setServerError('Error adding the plants');
    }
  };

  const handleUpdatePlant = async (id: string, updatedPlant: PlantT) => {
    const URL = `http://localhost:3000/plants/${id}`;
    try {
      await axios.put(URL, updatedPlant);
      setPlants(plants)
    } catch (error) {
      setServerError('Error updating the plants');
    }
  }

  const handleRemovePlant = async (id: string) => {
    const URL = `http://localhost:3000/plants/${id}`;
    try {
      await axios.delete(URL);
      setPlants((existingPlants) => existingPlants.filter(plant => plant._id !== id) )
    } catch (error) {
      setServerError('Error deleting the plants');
    }
  }

  return (
    <>
      <h1>GROW</h1>
      <AddPlant 
        handleAddPlant={handleAddPlant}
        setServerError={setServerError} 
        serverError={serverError}
      />
      <DisplayPlant 
        plants={plants} 
        handleUpdatePlant={handleUpdatePlant}
        handleRemovePlant={handleRemovePlant}
        setServerError={setServerError} 
        serverError={serverError}
      />
    </>
  );
};

export default App;