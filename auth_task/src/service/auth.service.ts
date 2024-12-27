import bcrypt from 'bcryptjs';

import jwt from "jsonwebtoken";
import { findUserById, findUserByUsername } from "../model/user.model";
import { createCustomError } from "../middleware/customErrorHandler";
import config from '../config';


export const logoutService = async (userId: number) => {
    
  const foundUser =  findUserById(userId);
  if (!foundUser) {
    throw createCustomError("Unable to process request", 400);
  }
  return true;
};

export const loginService = (username: string, password: string) => {
    console.log(username,password)
    if(!username || !password) throw createCustomError("Email and password field are required!",422)
  const user =  findUserByUsername(username);

  if (!user) throw createCustomError("Invalid credentials", 404);

  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) throw createCustomError("Invalid email or password", 400);


  const payload = {
    username: user.username,
    userId: user.id,
  };

  const token = jwt.sign({user:payload}, config.jwtSecret, { expiresIn: config.jwtExpiresIn });

  return {
    user: payload,
    token: token,
  };
};
