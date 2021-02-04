import express from 'express';
import'dotenv/config';
import connection from './database/connection';
import routes from './routes';

const app = express();

// Connect DB
process.env.MONGO_URI !== undefined && connection(process.env.MONGO_URI)

// Middleware
app.use(express.json());
app.use(routes)


app.listen(process.env.PORT || 5000, () => console.log("Server is running"));
