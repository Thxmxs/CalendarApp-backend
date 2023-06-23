"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validar_jwt_1 = require("../middlewares/validar-jwt");
const eventos_1 = require("../controller/eventos");
const express_validator_1 = require("express-validator");
const { fieldValidators } = require('../middlewares/fieldValidators');
const router = express_1.default.Router();
router.get('/', [
    validar_jwt_1.validarJWT
], eventos_1.getAllEvents);
router.post('/', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('title', 'El titulo es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('start', 'La fecha de inicio es obligatoria').not().isEmpty(),
    (0, express_validator_1.check)('end', 'La fecha de finalizacion es obligatoria').not().isEmpty(),
    fieldValidators
], eventos_1.createEvent);
router.put('/:id', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('title', 'El titulo es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('start', 'La fecha de inicio es obligatoria').not().isEmpty(),
    (0, express_validator_1.check)('end', 'La fecha de finalizacion es obligatoria').not().isEmpty(),
    fieldValidators
], eventos_1.updateEvent);
router.delete('/:id', validar_jwt_1.validarJWT, eventos_1.deleteEvent);
module.exports = router;
//# sourceMappingURL=events.js.map