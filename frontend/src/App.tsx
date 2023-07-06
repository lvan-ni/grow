import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import AddPlant from './components/AddPlant/AddPlant';
import DisplayPlant from './components/DisplayPlant/DisplayPlant';
import './App.css';

type PlantT = {
  name: string;
  light: string;
  water: string;
  note: string;
};
type NewPlant = {
  name: string;
  light: string;
  water: string;
};

const App = () => {
  const [plants, setPlants] = useState<PlantT[]>([]);
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    (async () => {
      const URL = 'http://localhost:3000/api/plants';
      try {
        const response = await axios.get(URL);
        console.log(response);
        const allPlants = response.data.plants;
        setPlants(allPlants);
      } catch (error) {
        setServerError('Error fetching the plants');
      }
    })();
  }, []);

  const handleAddPlant = async (newPlant: NewPlant) => {
    const URL = 'http://localhost:3000/plants';
    try {
      const response = await axios.post(URL);
      const addedPlant = response.data.plants;
      setPlants(existingPlants => [...existingPlants, addedPlant]);
    } catch (error) {
      setServerError('Error adding the plants');
    }
  };

  const handleUpdatePlant = async (id: string) => {
    const URL = `http://localhost:3000/plants/${id}`;
    try {
      const response = await axios.put(URL);
    } catch (error) {
      setServerError('Error updating the plants');
    }
  }

  const handleRemovePlant = async (id: string) => {
    const URL = `http://localhost:3000/plants/${id}`;
    try {
      const response = await axios.delete(URL);
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
