import { envs } from "./config/plugins/envs.plugin";
import AppRouter from './presentation/router';
import Server from "./presentation/server";

(() => main())();

async function main() {
  const server = new Server({
    port: envs.PORT,
    host: envs.HOST,
    router: AppRouter.routes,
    public_path: envs.PUBLIC_PATH,
  });
  server.start();
}