import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Event-rider APP');
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});