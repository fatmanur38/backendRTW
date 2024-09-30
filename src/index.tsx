import express from 'express';
import dotenv from 'dotenv';
import { router } from './routes';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
console.log("port", PORT);
app.use(express.json());

app.use(router);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});