const { ApolloServer } = require("apollo-server");
const { readFileSync } = require("fs");
const { start } = require("repl");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const models = require("../models");
const { Sequelize } = require("sequelize");
// const sequelize = new Sequelize("sqlite::memory:");
const sequelize = new Sequelize("sqlite:relativePath/dbname.db");

// Set the PORT (default to 8000 or accept an environment variable)
const PORT = process.env.PORT || 8000;

// Create a server instance
const server = new ApolloServer({
  resolvers,
  typeDefs,
  context: { models },
});

// Start the server on the specified port
async function startServer() {
  const { url } = await server.listen({ port: PORT });
  console.log(`Server is ready at ${url}`);

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

startServer();
