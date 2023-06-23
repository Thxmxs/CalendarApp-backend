import { Schema, model } from 'mongoose';
import { IEvent } from '../interfaces/IEvent';


  const EventSchema = new Schema<IEvent>({
    title: { type: String, required: true },
    notes: { type: String, required: true},
    start:{type: Date, required: true},
    end:{type: Date, required: true},
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
  });

export const Event = model<IEvent>('Event', EventSchema);