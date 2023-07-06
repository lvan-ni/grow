import { MongoClient, ObjectId } from 'mongodb';
const URL = "mongodb+srv://lvan:0000@cluster0.o3yk2gx.mongodb.net/?retryWrites=true&w=majority";

interface PlantT {
  name: string;
  light: string;
  water: string;
  note: string;
};

const client = new MongoClient(URL);

const connectDB = async () => {
  await client.connect();
  console.log("MongoDB connected...");
};

const getCollection = () => client.db("PlantInfo").collection("MockData");

const getPlants = async () => {
  const collection = getCollection();
  return await collection.find().toArray();
};

const createNewPlant = async (plant: PlantT) => {
  const collection = getCollection();
  return await collection.insertOne(plant);
};

const updatePlant = async (id: string, plant: PlantT) => {
  const collection = getCollection();
  await collection.updateOne({ id: id }, { $set: plant })
};

const deletePlant = async (id: string) => {
  const collection = getCollection();
  return await collection.findOneAndDelete({ _id: new ObjectId(id)  });
};

export { connectDB, getPlants, createNewPlant, updatePlant, deletePlant };