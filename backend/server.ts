import express from 'express';
import cors from 'cors';
import axios from 'axios';
import { connectDB, getPlants, createNewPlant, updatePlant, deletePlant } from './db';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

connectDB();


// const perenualAPI = async () => {
//   const ExternalURL = 'https://perenual.com/api/species-list?page=1&key=sk-KhRK64a589f537fe71479';
//   const res = await axios.get(ExternalURL);
//   console.log(res);
// };

app.get('/api/plants', async (req, res) => {
  try {
    const plants = await getPlants();
    res
      .status(200)
      .json(plants);
  } catch (error) {
    return res.status(404).json({ message: 'No plants found' });
  }
});

app.post("/api/plants", async (req, res) => {
  try {
    const newPlantToAdd = req.body;
    const NewPlant = await createNewPlant(newPlantToAdd);
    res
    .status(200)
    .json(NewPlant);
  } catch (error) {
    return res.status(400).json({ message: 'Cannot add plant' });
  }
});

app.put("/api/plants/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPlant = await updatePlant(id, req.body);
    res
    .status(200)
    .json(updatedPlant);
  } catch (error) {
    return res.status(400).json({ message: 'Cannot update plant' });
  }
});

app.delete("/api/plants/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPlant =  await deletePlant(id);
    res.json(deletedPlant);
  } catch (error) {
    return res.status(400).json({ message: 'Cannot delete plant' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});