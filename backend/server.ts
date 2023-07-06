import express from 'express';
import cors from 'cors';
// import { MongoClient } from 'mongodb';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// const uri = "<Your MongoDB Atlas connection string>"; // Replace with your string
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/api/plants', async (req, res) => {
  try {
    await client.connect();
    const collection = client.db("PlantInfo").collection("MockData");
    const plants = await collection.find().toArray();
    res.json(plants);
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
});

// The rest of your API routes...

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});