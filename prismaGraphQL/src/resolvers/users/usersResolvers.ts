import User from "./User";

const user = new User();

export const userResolvers = {
  Query: {
    getAllUsers: user.getAllUsers,
    getUserById: user.getUserById
  },
  Mutation: {
    createUser: user.createUser
  }
}