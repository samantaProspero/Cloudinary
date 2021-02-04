import express from 'express';
import'dotenv/config';
import routes from './routes';
import cors from 'cors';

import './database/connection';


const app = express();
app.use(cors());

// Middleware
app.use(express.json());
app.use(routes)


app.listen(process.env.PORT || 5000, () => console.log("Server is running"));
