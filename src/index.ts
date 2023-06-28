import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes'
import dbConnect from './db/dbConnect';
import colors from 'colors';

colors.enable();

dotenv.config();

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json())
app.use(express.urlencoded({ limit: '25mb' }));

const PORT = 5000 || process.env.PORT
routes(app);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`.cyan.underline.bold)

  dbConnect()
})