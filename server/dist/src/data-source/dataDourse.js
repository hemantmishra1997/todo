"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "todo",
    //entities : [User],
    //    entities: [__dirname + '/../**/*{.ts,.js}'],
    // entities: ["src/entity/**/*{.ts,.js}"],
    entities: ["src/entity/**/*.ts"],
    synchronize: true,
    logging: true,
});
exports.default = AppDataSource;
