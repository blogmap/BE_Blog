import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "hothanhtienqb123",
    database: "postgres",
    synchronize: true,  
    logging: true,
    entities: [__dirname + "/models/*.{js,ts}"],  
    subscribers: [],
    migrations: [],
});
