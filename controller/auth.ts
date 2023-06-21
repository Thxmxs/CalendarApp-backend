import { Request, Response } from "express";
const bcrypt = require('bcryptjs');
import { ILoginUser, IRegisterUser } from "../interfaces/IAuth";
import { generarJWT } from "../helpers/jwt";
import { CustomRequest } from "../interfaces/IExtends";
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

    const token = await generarJWT(usuario._id,usuario.name);

    res.status(201).json({
      ok: true,
      body,
      token
    });

  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg:`error en el servidor ${error}`
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

  const token = await generarJWT(usuario._id,usuario.name);
  return res.status(200).json({
    ok:true,
    uid:usuario._id,
    email:usuario.email,
    name:usuario.name,
    token
  })
    
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg:'Error en el servidor!'
    });
  }

};
const refreshToken = async(req: CustomRequest, res: Response) => {

  try {
    const _id = req._id;
    const name = req.name;
    
    if(!_id || !name){
      return res.json({
        ok:false,
        msg:'No hay informacion para generar el token'
      })
    }

    const token = await generarJWT(_id,name);
  
    res.json({
      ok: true,
      token
    });
  }
  catch (error) {
    console.log(error)
    return res.json({
      ok:false,
      msg:'No hay informacion para generar el token'
    })
  }
}


module.exports = {
  registerUser,
  loginUser,
  refreshToken
};
