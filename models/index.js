import dbConnection from "../data/db.js";
import Drivers from "./driverModel.js";
import Tickets from "./ticketModel.js";
import Rides from "./rideModel.js";
import Users from "./userModel.js";
import Events from "./eventModel.js";

Users.hasMany(Tickets, { foreignKey: 'user_id' });
Tickets.belongsTo(Users, { foreignKey: 'user_id' });

Events.hasMany(Tickets, { foreignKey: 'event_id' });
Tickets.belongsTo(Events, { foreignKey: 'event_id' });

Tickets.hasMany(Rides, { foreignKey: 'ticket_id' });
Rides.belongsTo(Tickets, { foreignKey: 'ticket_id' });

Drivers.hasMany(Rides, { foreignKey: 'driver_id' });
Rides.belongsTo(Drivers, { foreignKey: 'driver_id' });


export { dbConnection, Drivers, Tickets, Users, Rides, Events };

