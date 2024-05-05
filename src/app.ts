import { envs } from './config/plugins/envs.plugin';
import Server from './server';
import AppRouter from './router';
import { MongoDatabase } from './data';

(() => main())();

async function main() {

  await MongoDatabase.connect({
    URL: envs.MONGO_URL,
    DBName: envs.MONGO_DB_NAME,
  });

  const server = new Server({
    port: envs.PORT,
    host: envs.HOST,
    router: AppRouter.routes,
    public_path: envs.PUBLIC_PATH,
  });

  server.start();
}