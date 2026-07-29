import dbConnection from "../data/db.js";
import { DataTypes } from "sequelize";

const Rides = dbConnection.define('ride', {
    direction: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['to', 'from']]
        }
    },
    pickup_location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dropoff_location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pickup_time: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'requested',
        validate: {
        isIn: [['requested', 'confirmed', 'completed']]
        }
    }
});

export default Rides;
