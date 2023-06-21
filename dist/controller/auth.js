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
const jwt_1 = require("../helpers/jwt");
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
        const token = yield (0, jwt_1.generarJWT)(usuario._id, usuario.name);
        res.status(201).json({
            ok: true,
            body,
            token
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: `error en el servidor ${error}`
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
        const token = yield (0, jwt_1.generarJWT)(usuario._id, usuario.name);
        return res.status(200).json({
            ok: true,
            uid: usuario._id,
            email: usuario.email,
            name: usuario.name,
            token
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error en el servidor!'
        });
    }
});
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = req._id;
        const name = req.name;
        if (!_id || !name) {
            return res.json({
                ok: false,
                msg: 'No hay informacion para generar el token'
            });
        }
        const token = yield (0, jwt_1.generarJWT)(_id, name);
        res.json({
            ok: true,
            token
        });
    }
    catch (error) {
        console.log(error);
        return res.json({
            ok: false,
            msg: 'No hay informacion para generar el token'
        });
    }
});
module.exports = {
    registerUser,
    loginUser,
    refreshToken
};
//# sourceMappingURL=auth.js.map