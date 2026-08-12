import app, { connectDatabase } from './app';

const PORT = Number(process.env.PORT || 4000);

async function startServer() {
  await connectDatabase();
  app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
  });
}

startServer();
