import express from "express";
import sequelize from "./database/config";
import driverRoutes from "./routes/driverRoutes";
import tripRoutes from "./routes/tripRoutes";

const app = express();
app.use(express.json());

app.use("/drivers", driverRoutes);
app.use("/ride", tripRoutes);

const databaseStart = async () => {
    try{
        await sequelize.authenticate();
        console.log("Conexão realizada com sucesso.");
        await sequelize.sync();
        console.log("Banco de Dados sincronizado com sucesso!");

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Servidor Inicializado com sucesso, Rodando na porta ${PORT}`);
        });
    } catch (error){
        console.error("Falha na conexão com o Banco de Dados: ", error);
    }
};

databaseStart();