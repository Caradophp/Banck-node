import { DataSource } from "typeorm"
import { User } from "../entities/User";
import { Conta } from "../entities/Conta";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "./src/database/db.sqlite",
    entities: [User, Conta],
    migrations: [
        "./src/database/migrations/*.ts"
    ]
})

export async function connectDatabase() {
    try {
        await AppDataSource.initialize();
        console.log("Deu bom");
    } catch (err) {
        console.log(err);
    }
}