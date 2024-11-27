import { DataTypes, Model } from "sequelize";
import sequelize from "../database/config";
import Driver from "./Driver";

class Ride extends Model {
    public id!: number;
    public userId!: string;
    public origin!: string;
    public destination!: string;
    public driverId!: number;
    public distance!: number;
    public cost!: number;
    public duration!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
}

Ride.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        origin: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        destination: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        driverId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        distance: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        cost: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        duration: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "rides",
    }
);

Ride.belongsTo(Driver, { foreignKey: "driverId"});

export default Ride;
