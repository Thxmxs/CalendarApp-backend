import {  Types } from "mongoose";

export interface IEvent{
    title:string;
    notes:string;
    start:Date
    end:Date
    user:Types.ObjectId
}