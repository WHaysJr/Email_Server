const { ApolloError } = require("apollo-server");
const { formatError } = require("graphql");
const { ValidationError } = require("sequelize");
const { Sequelize } = require("sequelize");
const sequelize = require("sequelize");
const { Instance } = require("sequelize");
const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const resolvers = {
  Query: {
    async oneEmail(root, { id }, { models }) {
      return models.Email.findOne({
        where: {
          id: id,
        },
      });
    },

    async allEmails(root, args, { models }) {
      return models.Email.findAll();
    },
  },

  Mutation: {
    async createEmail(root, { address }, { models }) {
      if (address === "") {
        throw new ApolloError("Email address cannot be blank!");
      }
      if (!address.match(emailRegex)) {
        throw new ApolloError(`${address} is not a valid email address!`);
      }
      let find = {};
      try {
        find = await models.Email.findOne({
          where: {
            address,
          },
        });
        console.log("FIND: " + find);
        if (find === null) {
          find = await models.Email.create({
            address: address,
          });
        } else {
          throw error;
        }
      } catch (error) {
        throw new ApolloError("Email address already exists!");
      }
      return find;
    },

    async deleteEmail(root, { address }, { models }) {
      let model = {};
      try {
        model = await models.Email.findOne({
          where: {
            address,
          },
        });
        await model.destroy();
      } catch (error) {
        throw new ApolloError(`Couldn't find address: ${address} to delete.`);
      }
      return model;
    },
  },
};
module.exports = resolvers;
