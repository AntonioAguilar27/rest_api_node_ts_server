import express  from "express";
import router from './router'
import db from "./config/db";
import colors from 'colors'

// conectar a base de datos

async function conectDB() {
    try {
        await db.authenticate()
        db.sync()
        //console.log(colors.magenta.bold('conexione exitosa a la bd'))
    } catch(error){
        console.log(error)
        console.log(colors.red.bold('hubo un error al conectar con la bd'))
    }
}
conectDB()

// instancia express
const server = express()

// leer datos de formularios
server.use(express.json())



server.use('/api/products', router)

server.get('/api',(req, res) => {
    res.json({msg: 'desde API'})
})

export default server