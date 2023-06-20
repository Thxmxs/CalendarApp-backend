import express from 'express';
const { check } = require('express-validator');
const {fieldValidators} = require('../middlewares/fieldValidators');
const router = express.Router();

const {registerUser, loginUser, refreshToken} = require('../controller/auth');

router.post('/', [
    check('email',' El email es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').isLength({min:6}),
    fieldValidators
], loginUser);

router.post('/new',[
    check('name',' El nombre es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser de 6 caracteres').isLength({min:6}),
    fieldValidators
], registerUser);

router.get('/refresh', refreshToken)

module.exports = router;