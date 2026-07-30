import {dbConnection, Drivers, Users, Events} from "./models/index.js";

  
async function seed () {
    try {
        await dbConnection.sync({force: true});

        const drivers = await Drivers.bulkCreate([
            {
                name: "Michael",
                vehicle_description: "Black Honda Civic",
                plate_number: "INSI7"
            },
            {
                name: "Nason",
                vehicle_description: "Red Toyota Camry",
                plate_number: "898XY"
            }
        ]);

        const users = await Users.bulkCreate([
            {
                name: "Alice",
                dob: "2003-1-3",
                email: "alice@gmail.com",
                password_hash: "hashedpassword1"
            },
        ]);
        const events = await Events.bulkCreate([
            {
                name: "Coldplay",
                venue: "MetLife Stadium",
                address: "1 MetLife Stadium Dr, East Rutherford, NJ",
                start_time: new Date("2026-08-14T19:20:00"),
                end_time: new Date("2026-08-14T23:22:00"),
                description: "Coldplay's world tour featuring immersive visuals and fan favorites."
            },
            {
                name: "Billie Eilish - HIT ME HARD AND SOFT TOUR",
                venue: "Barclays Center",
                address: "620 Atlantic Ave, Brooklyn, NY",
                start_time: new Date("2026-08-14T19:20:00"),
                end_time: new Date("2026-08-14T23:22:00"),
                description: "Coldplay's world tour featuring immersive visuals and fan favorites."
            },
        ]);
// before create the seeds for tickets we need to make sure the assosication is alread exsit.

  console.log("Seeded");
  process.exit();
  
} catch (err) {
    console.error(err);
}} 

seed();
