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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { dbConnection } = require('../database/config');
require('dotenv').config();
var cors = require('cors');
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8000';
        this.conectarDB();
        //* middlewares
        this.middlewares();
        //* rutas
        this.routes();
    }
    conectarDB() {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnection();
        });
    }
    listen() {
        this.app.listen(this.port, () => console.log(`Servidor corriendo en el puerto ${this.port}`));
    }
    routes() {
        this.app.use('/api/auth', require('../routes/auth'));
        this.app.use('/api/events', require('../routes/events'));
    }
    middlewares() {
        //* cors
        this.app.use(cors());
        //* lectura y parseo del body cuando nos envian un post
        this.app.use(express_1.default.json());
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map