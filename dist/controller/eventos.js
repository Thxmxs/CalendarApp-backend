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
const Event = require('../models/Event');
const getAllEvents = (req, res) => {
    const body = req.body;
    res.json({
        ok: true
    });
};
exports.getAllEvents = getAllEvents;
const updateEvent = (req, res) => {
    res.json({
        ok: true
    });
};
exports.updateEvent = updateEvent;
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    console.log(body);
    const event = new Event(body);
    event.user = req._id;
    try {
        const eventSaved = yield event.save();
        res.json({
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
const deleteEvent = (req, res) => {
    res.json({
        ok: true
    });
};
exports.deleteEvent = deleteEvent;
//# sourceMappingURL=eventos.js.map