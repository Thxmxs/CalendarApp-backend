"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validar_jwt_1 = require("../middlewares/validar-jwt");
const { check } = require('express-validator');
const { fieldValidators } = require('../middlewares/fieldValidators');
const router = express_1.default.Router();
const { registerUser, loginUser, refreshToken } = require('../controller/auth');
router.post('/', [
    check('email', ' El email es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').isLength({ min: 6 })
], loginUser);
router.post('/new', [
    check('name', ' El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 }),
    fieldValidators
], registerUser);
router.get('/refresh', validar_jwt_1.validarJWT, refreshToken);
module.exports = router;
//# sourceMappingURL=auth.js.map