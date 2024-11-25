import { DataTypes, Model } from "sequelize";
import sequelize from "../database/config";

class Driver extends Model {
    public id!: number;
    public name!: string;
    public description!: string;
    public car!: string;
    public rating!: number;
    public rate!: number;
    public minKm!: number;
}

Driver.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        car: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rating: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0
        },
        rate: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        minKm: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "drivers"
    }
);

export default Driver;