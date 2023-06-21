import { Request, Response } from "express";
import { IEvent } from "../interfaces/IEvent";
import { CustomRequest } from "../interfaces/IExtends";
const Event = require('../models/Event');

export const getAllEvents = (req:Request, res:Response) =>{

    const body:IEvent = req.body;

    res.json({
        ok:true
    });

}

export const updateEvent = (req:Request, res:Response) =>{
    res.json({
        ok:true
    })
}
export const createEvent = async(req:CustomRequest, res:Response) =>{
    const body : IEvent = req.body;
    console.log(body)
    const event = new Event(body);

    event.user = req._id;

    try {
        const eventSaved = await event.save();
        res.json({
            ok:true,
            eventSaved
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }

}
export const deleteEvent = (req:Request, res:Response) =>{
    res.json({
        ok:true
    })
}