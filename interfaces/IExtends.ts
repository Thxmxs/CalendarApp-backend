import { Request } from "express";

export interface CustomRequest extends Request {
    _id?: string;
    name?:string
  }