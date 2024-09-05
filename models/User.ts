import mongoose from "mongoose";
import {UserFields, UserMethods, UserModel} from "../types";
import bcrypt from 'bcrypt';
import {randomUUID} from "node:crypto";

const SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;

const UserSchema
    = new Schema<UserFields, UserModel, UserMethods>({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    token:{
        type: String,
        required: true,
    }
});

const User = mongoose.model<UserFields, UserModel>('User', UserSchema);

export default User;