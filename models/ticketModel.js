
import dbConnection from "../data/db.js";
import { DataTypes } from "sequelize";

const Ticket = dbConnection.define("ticket", {
    is_bundle: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    status: {
        type: DataTypes.ENUM('active', 'cancalled'),
        allowNull: false,
        defaultValue: 'active'
    }
});

export default Ticket;