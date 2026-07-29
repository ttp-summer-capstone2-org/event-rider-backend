import dbConnection from "../data/db.js";
import { DataTypes } from "sequelize";

const Driver = dbConnection.define("driver", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    vehicle_description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    plate_number: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

export default Driver;