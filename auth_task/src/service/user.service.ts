import { createCustomError } from "../middleware/customErrorHandler";
import { findUserById, findUserByUsername } from "../model/user.model";

export const profileService =  (username: string) => {
  const foundUser = findUserByUsername(username);
  delete foundUser.password;

  if (!foundUser) {
    throw createCustomError("Unable to process request", 400);
  }
  return foundUser;
};
