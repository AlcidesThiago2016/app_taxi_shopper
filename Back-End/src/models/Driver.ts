import { DataTypes, Model } from "sequelize";
import sequelize from "../database/config";

class Driver extends Model {
    public id!: number;
    public name!: string;
    public description!: string;
    public vehicle!: string;
    public review!: {
        rating: number;
        comment: string;
    };
    public value!: number;
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
        vehicle: {
            type: DataTypes.STRING,
            allowNull: false
        },
        review: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        value: {
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