const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://jas:pGgFEkE8MgF27HKb@cluster0.7f4zk.mongodb.net/eventos-app?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectDB() {
  try {
    if (!client.isConnected()) {
      await client.connect();
      console.log("Conectado a MongoDB!");
    }
    return client;
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    throw error;
  }
}

module.exports = connectDB;


