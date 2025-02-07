import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
dotenv.config();

const db = new Sequelize(process.env.DATABSE_URL!, {
    models: [__dirname + '/../models/**/*.ts'],
    logging: false
});
export default db;
