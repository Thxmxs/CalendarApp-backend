"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const mongoose_1 = require("mongoose");
const EventSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    notes: { type: String, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});
exports.Event = (0, mongoose_1.model)('Event', EventSchema);
//# sourceMappingURL=Event.js.map