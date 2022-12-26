import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserType = {
  username: String,
  password: String,
  age: Number,
  avatar: String,
};

export const UserModel = mongoose.model('user', new Schema(UserType));
