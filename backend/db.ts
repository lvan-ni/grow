import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = "mongodb+srv://lvan:7fucx8sz|7nVtHTF@cluster0.o3yk2gx.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const run = async () => {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
};

run();