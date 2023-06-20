import { Request, Response } from "express";
const bcrypt = require('bcryptjs');
import { ILoginUser, IRegisterUser } from "../interfaces/IAuth";
import { Model } from "mongoose";
const Usuario = require("../models/User");

const registerUser = async (req: Request, res: Response) => {
  const body: IRegisterUser = req.body;

  try {

    let usuario = await Usuario.findOne({email:body.email});

    if(usuario){
        res.status(401).json({
            ok:false,
            msg:'Ya existe un usuario con el correo ingresado'
        })
    }
    usuario = new Usuario(body);

    const salt = bcrypt.genSaltSync(10);
    usuario.password = bcrypt.hashSync(body.password,salt);

    await usuario.save();

    res.status(201).json({
      ok: true,
      body,
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      msg:'Error en el servidor!'
    });
  }
};

const loginUser = async(req: Request, res: Response) => {
  const { email, password }: ILoginUser = req.body;

  try {

    let usuario : ILoginUser = await Usuario.findOne({ email });

    if(!usuario){
        return res.status(400).json({
            ok:false,
            msg:'Usuario o contraseña incorrecto'
        })
    }

    const validPassword = bcrypt.compareSync(password, usuario.password);

    if(!validPassword){
      return res.status(400).json({
          ok:false,
          msg:'Usuario o contraseña incorrecto'
      })
  }

  //TODO: JWT

  res.status(200).json({
    ok:true,
    uid:usuario.uid,
    email:usuario.email,
    name:usuario.name
  })
    
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg:'Error en el servidor!'
    });
  }

};
const refreshToken = (req: Request, res: Response) => {
  res.json({
    ok: true,
  });
};

module.exports = {
  registerUser,
  loginUser,
  refreshToken,
};
