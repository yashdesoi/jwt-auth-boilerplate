import express from 'express';
import dotenv from 'dotenv';
import { connectToDatabase } from './config';
import { Server } from 'http';
import { authRoute, helloWorldRoute } from './api/v1/routes';
import morgan from 'morgan';
import { isAuthorized, outcomeHandler } from './api/v1/middlewares';

dotenv.config();
const app = express();
const { PORT, MODE } = process.env;
let server: Server;

app.use(morgan('dev'));

// Payload as application/json
app.use(express.json());

// Payload as application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/auth', authRoute);

app.use(isAuthorized);
app.use('/api/v1/hello-world', helloWorldRoute);

app.use(outcomeHandler);



connectToDatabase()
  .then(() => server = app.listen(PORT, () => console.log(`Server is running in ${MODE} mode on port ${PORT}`)));

process.on('unhandledRejection', (error: Error, promise) => {
  console.log(`${error.name}: ${error.message}`);
  server?.close(() => process.exit(1));
});





