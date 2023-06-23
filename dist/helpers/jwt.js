"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generarJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generarJWT = (_id, name, email) => {
    return new Promise((resolve, reject) => {
        const payload = { _id, name, email };
        let secret = process.env.SECRET_JWT_SEED || "";
        jsonwebtoken_1.default.sign(payload, secret, {
            expiresIn: "2h",
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject("No se pudo generar el token");
            }
            resolve(token);
        });
    });
};
exports.generarJWT = generarJWT;
//# sourceMappingURL=jwt.js.map