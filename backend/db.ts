import { MongoClient, ObjectId } from 'mongodb';
import { NewPlantT, UpdatePlantT } from './type';
const URL = 'mongodb+srv://lvan:0000@cluster0.o3yk2gx.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(URL);

const connectDB = async () => {
  await client.connect();
  console.log('MongoDB connected...');
};

const getCollection = () => client.db('PlantInfo').collection('MockData');

const getPlants = async () => {
  const collection = getCollection();
  return await collection.find().toArray();
};

const createNewPlant = async (newPlantToAdd: NewPlantT) => {
  const collection = getCollection();
  return await collection.insertOne(newPlantToAdd);
};

const updatePlant = async (id: string, PlantToUpdate: UpdatePlantT) => {
  const collection = getCollection();
  const { name, light, water, note } = PlantToUpdate;
  return await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { name, light, water, note } },
  );
};

const deletePlant = async (id: string) => {
  const collection = getCollection();
  return await collection.findOneAndDelete({ _id: new ObjectId(id) });
};

export { connectDB, getPlants, createNewPlant, updatePlant, deletePlant };
