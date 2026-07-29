import express from 'express';
import {Tickets, dbConnection, Drivers, Users, Rides, Events} from './models/index.js'
import eventRoutes from './routes/eventRoutes.js';
import userRoutes from './routes/userRoutes.js';
import driverRoutes from './routes/driverRoutes.js'

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

app.get('/', (req, res) => {
  res.send('Event Rider backend is running');
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is reachable' });
});

app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);
app.use('/api/drivers',driverRoutes);
dbConnection.sync()
  .then(() => {
    console.log('Database connected');
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server listening on port http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to databse:', err);
  });





