import { Request } from "express";
import { Types } from "mongoose";

export interface CustomRequest extends Request {
    _id?: Types.ObjectId;
    name?:string
    email?:string
  }