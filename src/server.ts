import express  from "express";
import colors from 'colors'
import cors, { CorsOptions } from 'cors'
import morgan from 'morgan'
import swaggerUI from 'swagger-ui-express'
import swaggerSpec from "./config/swagger";

import router from './router'
import db from "./config/db";
// conectar a base de datos

export async function conectDB() {
    try {
        await db.authenticate()
        db.sync()
        //console.log(colors.magenta.bold('conexione exitosa a la bd'))
    } catch(error){
        console.log(colors.red.bold('hubo un error al conectar con la bd'))
    }
}
conectDB()

// instancia express
const server = express()

// habilitar cors 

const corsOptions : CorsOptions = {
    origin: function(origin, callback){
        if(origin === process.env.FRONTEND_URL){
            callback(null, true)
        } else {
            callback(new Error('error de cors'))
        }
    }
}
server.use(cors(corsOptions))

// leer datos de formularios
server.use(express.json())


server.use(morgan('dev'))



server.use('/api/products', router)

//DOCS 

server.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec) )

export default server