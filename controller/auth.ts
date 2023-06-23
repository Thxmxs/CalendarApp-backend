import { Request, Response } from "express";
const bcrypt = require('bcryptjs');
import { ILoginUser, IRegisterUser } from "../interfaces/IAuth";
import { generarJWT } from "../helpers/jwt";
import { CustomRequest } from "../interfaces/IExtends";
const Usuario = require("../models/User");

const registerUser = async (req: Request, res: Response) => {
  const {email,name,password}: IRegisterUser = req.body;

  try {

    let usuario = await Usuario.findOne({email:email});

    if(usuario){
        return res.status(401).json({
            ok:false,
            msg:'Ya existe un usuario con el correo ingresado'
        })
    }
    usuario = new Usuario({email,name,password});

    const salt = bcrypt.genSaltSync(10);
    usuario.password = bcrypt.hashSync(password,salt);

    const user = await usuario.save();

    const token = await generarJWT(usuario._id,usuario.name, usuario.email);

    res.status(201).json({
      ok: true,
      user:{
        "_id":user._id,
        "name":name,
        "email":email
      },
      token
    });

  } catch (error) {
    console.log(error)
    return res.status(500).json({
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

  const token = await generarJWT(usuario._id,usuario.name, usuario.email);
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
    const email = req.email;
    
    if(!_id || !name || !email){
      return res.json({
        ok:false,
        msg:'No hay informacion para generar el token'
      })
    }

    const token = await generarJWT(_id.toString(),name, email);
  
    res.json({
      ok: true,
      uid:_id,
      name,
      email,
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
