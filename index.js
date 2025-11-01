import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import contactRoute from './routes/contact.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('✅ API is running successfully on Railway!');
});

app.use('/api', contactRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Server is listening on port ${PORT}`);
});
