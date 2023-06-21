import { Model } from "mongoose";
import { ILoginUser } from "./IAuth";

export interface IEvent{
    title:string;
    notes:string;
    start:Date
    end:Date
    user:Model<ILoginUser>
}