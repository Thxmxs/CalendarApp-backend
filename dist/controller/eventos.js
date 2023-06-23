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
exports.deleteEvent = exports.createEvent = exports.updateEvent = exports.getAllEvents = void 0;
const Event_1 = require("../models/Event");
const getAllEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const events = yield Event_1.Event.find().populate('user', 'name');
    res.json({
        ok: true,
        events
    });
});
exports.getAllEvents = getAllEvents;
const updateEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const eventId = req.params.id;
    try {
        const evento = yield Event_1.Event.findById(eventId);
        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'El evento no existe'
            });
        }
        if (evento.user.toString() !== ((_a = req._id) === null || _a === void 0 ? void 0 : _a.toString())) {
            return res.status(401).json({
                ok: false,
                msg: 'No esta autorizado para realizar esta accion'
            });
        }
        const nuevoEvento = Object.assign(Object.assign({}, req.body), { user: req._id });
        const eventoActualizado = yield Event_1.Event.findByIdAndUpdate(eventId, nuevoEvento, { new: true });
        res.json({
            ok: true,
            eventoActualizado
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error de servidor, comuniquese con el administrador'
        });
    }
});
exports.updateEvent = updateEvent;
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    console.log(body);
    const event = new Event_1.Event(body);
    if (!req._id) {
        return res.json({
            ok: false,
            msg: 'No hay un id valido logeado'
        });
    }
    event.user = req._id;
    try {
        const eventSaved = yield event.save();
        return res.json({
            ok: true,
            eventSaved
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
});
exports.createEvent = createEvent;
const deleteEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const eventId = req.params.id;
    try {
        const evento = yield Event_1.Event.findById(eventId);
        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'El evento no existe'
            });
        }
        if (evento.user.toString() !== ((_b = req._id) === null || _b === void 0 ? void 0 : _b.toString())) {
            return res.status(401).json({
                ok: false,
                msg: 'No esta autorizado para realizar esta accion'
            });
        }
        yield Event_1.Event.findByIdAndDelete(eventId);
        res.json({
            ok: true,
            msg: 'El envento se elimino correctamente'
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error de servidor, comuniquese con el administrador'
        });
    }
});
exports.deleteEvent = deleteEvent;
//# sourceMappingURL=eventos.js.map