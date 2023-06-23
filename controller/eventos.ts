import { Request, Response } from "express";
import { IEvent } from "../interfaces/IEvent";
import { CustomRequest } from "../interfaces/IExtends";
import { Event } from '../models/Event';


export const getAllEvents = async(req:Request, res:Response) =>{

    const events = await Event.find().populate('user', 'name');

    res.json({
        ok:true,
        events
    });

}

export const updateEvent = async(req:CustomRequest, res:Response) =>{

    const eventId = req.params.id;

    try {

        const evento = await Event.findById(eventId);

        if(!evento){
            return res.status(404).json({
                ok:false,
                msg:'El evento no existe'
            })
        }

        if(evento.user.toString() !== req._id?.toString()){
            return res.status(401).json({
                ok:false,
                msg:'No esta autorizado para realizar esta accion'
            })
        }

        const nuevoEvento = {
            ...req.body,
            user:req._id
        }

        const eventoActualizado = await Event.findByIdAndUpdate(eventId,nuevoEvento, {new:true});


        res.json({
            ok:true,
            eventoActualizado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'error de servidor, comuniquese con el administrador'
        })
    }

}

export const createEvent = async(req:CustomRequest, res:Response) =>{
    const body : IEvent = req.body;
    console.log(body)
    const event = new Event(body);
    
    if(!req._id){
        return res.json({
            ok:false,
            msg:'No hay un id valido logeado'
        })
    }
    event.user = req._id;

    try {
        const eventSaved = await event.save();
        return res.json({
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
export const deleteEvent = async(req:CustomRequest, res:Response) =>{
    const eventId = req.params.id;

    try {

        const evento = await Event.findById(eventId);

        if(!evento){
            return res.status(404).json({
                ok:false,
                msg:'El evento no existe'
            })
        }

        if(evento.user.toString() !== req._id?.toString()){
            return res.status(401).json({
                ok:false,
                msg:'No esta autorizado para realizar esta accion'
            })
        }

       await Event.findByIdAndDelete(eventId);


        res.json({
            ok:true,
            msg:'El envento se elimino correctamente'
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'error de servidor, comuniquese con el administrador'
        })
    }

}