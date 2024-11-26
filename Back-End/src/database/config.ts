import { Sequelize } from "sequelize";

const sequelize =  new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite" //Arquivo de dados do banco dados
})

export default sequelize;