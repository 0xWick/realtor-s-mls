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

// Function to generate a random user
const generateRandomUser = () => ({
  name: faker.person.fullName(),
  phone: faker.phone.number(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

// Main function to add random users
const addRandomUsers = async (count = 10) => {
  const { client, db } = await connectToDatabase();
  const usersCollection = db.collection('users');

  const users = Array.from({ length: count }, generateRandomUser);

  const result = await usersCollection.insertMany(users);
  console.log(`${result.insertedCount} users inserted`);
  await client.close(); // Close the connection
  process.exit(0);
};

addRandomUsers(10).catch(console.error);
