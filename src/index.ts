import sequelize from "./database/config";
import Driver from "./models/driver";

const databaseStart = async () => {
    try{
        await sequelize.authenticate();
        console.log("Conexão realizada com sucesso.");
        await sequelize.sync({force: true});
        console.log("Tabelas sincronizadas com sucesso!");
    } catch (error){
        console.error("Falha na conexão com o Banco de Dados: ", error);
    }
};
databaseStart();