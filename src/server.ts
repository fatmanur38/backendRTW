// src/server.ts

import app from './app';

const PORT = process.env.PORT || 4000; // PORT'u ayarlıyoruz
const BACKEND_URL = process.env.BACKEND_URL || `http://localhost:${PORT}`;

app.listen(PORT, () => {
  console.log(`Server is running on ${BACKEND_URL}`);
}).on('error', (err) => {
  console.error('Failed to start server:', err);
});
