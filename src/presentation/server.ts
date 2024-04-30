import path from "path";
import express, { Request, Response } from "express";
import { envs } from "../config/plugins/envs.plugin";

type Options = {
  host: string;
  port: number;
  // router: Router;
  public_path: string;
};

class Server {
  public readonly app = express();
  private serverListener?: any;
  private readonly host: string;
  private readonly port: number;
  // private readonly routes: Router;
  private readonly public_path: string;

  constructor(options: Options) {
    this.host = options.host;
    this.port = options.port;
    // this.routes = options.router;
    this.public_path = options.public_path;
  }

  async start() {
    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server running at: ${this.host}:${this.port}`);
    });

    //* Middlewares
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    //* Single Page Application (SPA) like React, Vue, Angular, Solid, Qwik, etc.
    this.app.use(express.static('public'));

    this.app.get('*', (_request: Request, response: Response) => {
      const indexPath = path.join(__dirname, `./${this.public_path}/index.html`);
      console.log(indexPath)
      response.sendFile(indexPath);
    });

  }

  public close() {
    this.serverListener?.close();
  }
}

export default Server;
