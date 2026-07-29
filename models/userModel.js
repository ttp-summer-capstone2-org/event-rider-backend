import { DataTypes } from "sequelize";
import dbConnection from "../data/db.js";

const User = dbConnection.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    dob: {
        type: DataTypes.DATEONLY,
        allowNull:false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull:false,
        unique:true,
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull:false,
    }
});

export default User;