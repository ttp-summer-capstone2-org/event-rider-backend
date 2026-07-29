import dbConnection from "../data/db.js";
import { DataTypes } from "sequelize";

const Tickets = dbConnection.define("ticket", {
    is_bundle: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active',
        validate: {
            isIn: [['active', 'cancelled']]
        }
    }
});

export default Tickets;