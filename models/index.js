import dbConnection from "../data/db.js";
import Drivers from "./driverModel.js";
import Tickets from "./ticketModel.js";
import Rides from "./rideModel.js";
import Users from "./userModel.js";
import Events from "./eventModel.js";

Users.hasMany(Tickets, { foreignKey: 'user_id' });
Tickets.belongsTo(Users, { foreignKey: {
  name: 'user_id',
  allowNull: false
}});

Events.hasMany(Tickets, { foreignKey: 'event_id' });
Tickets.belongsTo(Events, { foreignKey: {
  name: 'event_id', 
  allowNull: false
}});

Tickets.hasMany(Rides, { foreignKey: 'ticket_id' });
Rides.belongsTo(Tickets, { foreignKey: {
  name: 'ticket_id',
  allowNull: false
 }});

Drivers.hasMany(Rides, { foreignKey: 'driver_id' });
Rides.belongsTo(Drivers, { foreignKey: {
  name: 'driver_id',
  allowNull: false

}});


export { dbConnection, Drivers, Tickets, Users, Rides, Events };

