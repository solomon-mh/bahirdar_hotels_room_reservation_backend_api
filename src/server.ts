import 'dotenv/config';
import { createApp } from './app';
import { connectToMongoDB } from './mongo-connection';
import './lib/config/environment.config';
import { envConfig } from './lib/config/environment.config';
// import { createAdmin } from './set-up-script';

const PORT = envConfig.PORT;

async function startServer() {
  try {
    await connectToMongoDB();
    const app = createApp();

    // await createAdmin();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}...`);
    });
  } catch (error) {
    console.error('Failed to start the server:', error);
    process.exit(1);
  }
}

startServer();
