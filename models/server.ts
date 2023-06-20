import express from 'express';
const {dbConnection} = require('../database/config')
require('dotenv').config();
var cors = require('cors');

class Server {

    private app: express.Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';
        this.conectarDB();

        //* middlewares
        this.middlewares();

        //* rutas
        this.routes();
       
    }

    async conectarDB(){
        await dbConnection();
    }

    listen(){
        this.app.listen(this.port, () => console.log(`Servidor corriendo en el puerto ${this.port}`))
    }

    routes(){
        this.app.use('/api/auth', require('../routes/auth'))
    }

    middlewares(){
        //* cors
        this.app.use(cors())
        //* lectura y parseo del body cuando nos envian un post
        this.app.use(express.json())
    }

}

export default Server;