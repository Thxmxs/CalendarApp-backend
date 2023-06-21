import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IPayloadJWT } from "../interfaces/IAuth";
import { CustomRequest } from "../interfaces/IExtends";



export const validarJWT = (req : CustomRequest,res : Response,next : NextFunction) => {

    const token = req.header('x-token');

    if(!token){
        return res.status(400).json({
            ok:false,
            msg: 'No hay token en la peticion'
        })
    }

    try {
        
        const payload = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED || ''
        ) as IPayloadJWT;

       req._id = payload._id;
       req.name = payload.name; 

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            ok:false,
            msg: 'Token no valido'
        })
    }


    next();
}
