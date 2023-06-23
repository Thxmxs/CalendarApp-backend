"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var mongoose = require('mongoose');
const validarJWT = (req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.SECRET_JWT_SEED || '');
        req._id = payload._id;
        req.name = payload.name;
        req.email = payload.email;
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Token no valido'
        });
    }
    next();
};
exports.validarJWT = validarJWT;
//# sourceMappingURL=validar-jwt.js.map