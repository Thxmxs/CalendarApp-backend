"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require('bcryptjs');
const Usuario = require("../models/User");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        let usuario = yield Usuario.findOne({ email: body.email });
        if (usuario) {
            res.status(401).json({
                ok: false,
                msg: 'Ya existe un usuario con el correo ingresado'
            });
        }
        usuario = new Usuario(body);
        const salt = bcrypt.genSaltSync(10);
        usuario.password = bcrypt.hashSync(body.password, salt);
        yield usuario.save();
        res.status(201).json({
            ok: true,
            body,
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor!'
        });
    }
});
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        let usuario = yield Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario o contraseña incorrecto'
            });
        }
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario o contraseña incorrecto'
            });
        }
        //TODO: JWT
        res.status(200).json({
            ok: true,
            uid: usuario.uid,
            email: usuario.email,
            name: usuario.name
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor!'
        });
    }
});
const refreshToken = (req, res) => {
    res.json({
        ok: true,
    });
};
module.exports = {
    registerUser,
    loginUser,
    refreshToken,
};
//# sourceMappingURL=auth.js.map