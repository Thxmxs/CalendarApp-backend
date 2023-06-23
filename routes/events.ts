import express from 'express';
import { validarJWT } from '../middlewares/validar-jwt';
import { createEvent, deleteEvent, getAllEvents, updateEvent } from '../controller/eventos';
import { check } from 'express-validator';

const {fieldValidators} = require('../middlewares/fieldValidators');
const router = express.Router();

router.get('/',[
    validarJWT
], getAllEvents);

router.post('/',[
    validarJWT,
    check('title','El titulo es obligatorio').not().isEmpty(),
    check('start','La fecha de inicio es obligatoria').not().isEmpty(),
    check('end','La fecha de finalizacion es obligatoria').not().isEmpty(),
    fieldValidators
], createEvent);

router.put('/:id',[
    validarJWT,
    check('title','El titulo es obligatorio').not().isEmpty(),
    check('start','La fecha de inicio es obligatoria').not().isEmpty(),
    check('end','La fecha de finalizacion es obligatoria').not().isEmpty(),
    fieldValidators
], updateEvent);

router.delete('/:id',validarJWT, deleteEvent);

module.exports=router;

