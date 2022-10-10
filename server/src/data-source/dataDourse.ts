import { DataSource } from "typeorm"
const AppDataSource = new DataSource({

    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "todo",
    //entities : [User],
    //entities: [__dirname + '/../**/*{.ts,.js}'],
    // entities: ["src/entity/**/*{.ts,.js}"],
    entities: ["src/entity/**/*.ts"],
    synchronize: true,
    logging:true,      
})
export default AppDataSource