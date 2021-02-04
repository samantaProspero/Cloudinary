import express from 'express';
import'dotenv/config';
import routes from './routes';
import './database/connection';


const app = express();

// Middleware
app.use(express.json());
app.use(routes)


app.listen(process.env.PORT || 5000, () => console.log("Server is running"));
