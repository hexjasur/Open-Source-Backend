require('dotenv').config();

const app = require('./src/app');
const connectDatabase = require('./src/config/database');

const PORT = process.env.PORT || 7777;
const requiredEnvs = ['MONGO_URI', 'JWT_SECRET', 'JWT_REFRESH_SECRET'];

requiredEnvs.forEach((key) => {
  if (!process.env[key]) {
    console.error(`✗ Missing required environment variable: ${key}`);
    process.exit(1);
  }
});

const startServer = async () => {
  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`✓ Server running on port ${PORT}`);
    console.log(`✓ API: http://localhost:${PORT}`);
    console.log(`✓ Docs: http://localhost:${PORT}/docs`);
  });
};

startServer();
