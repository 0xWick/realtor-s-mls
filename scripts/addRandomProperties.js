const { faker } = require('@faker-js/faker');
const { MongoClient } = require('mongodb');

// MongoDB URI from environment variable or default value
// const uri = 
// TODO: Add your MongoDB URI here
// Function to connect to MongoDB
const connectToDatabase = async () => {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(); // Use default database
  return { client, db };
};

// Function to generate a random property
const generateRandomProperty = () => ({
  name: faker.company.name(),
  description: faker.lorem.sentences(),
  price: faker.number.int({ min: 100000, max: 1000000 }),
  createdBy: faker.string.uuid(),
});

// Main function to add random properties
const addRandomProperties = async (count = 10) => {
  const { client, db } = await connectToDatabase();
  const propertiesCollection = db.collection('properties');

  const properties = Array.from({ length: count }, generateRandomProperty);

  const result = await propertiesCollection.insertMany(properties);
  console.log(`${result.insertedCount} properties inserted`);
  await client.close(); // Close the connection
  process.exit(0);
};

addRandomProperties(10).catch(console.error);
