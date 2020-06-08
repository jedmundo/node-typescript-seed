import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import ErrorMiddleware from './middleware/error-middleware';
import PageNotFoundMiddleware from './middleware/page-not-found-middleware';

import TodoRouter from './routers/todo.router';

const isDevelopment = process.env.NODE_ENV === 'development';
const DIST_FOLDER = process.cwd();

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.configBeforeRoutes();
    this.routes();
    this.configAfterRoutes();
  }

  private configBeforeRoutes(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));

    this.app.use(express.static(DIST_FOLDER));

    if (isDevelopment) {
      const corsOptions = {
        origin: 'http://localhost:3000',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
      };
      this.app.use(cors(corsOptions));
    }
  }

  private configAfterRoutes(): void {
    this.app.use(PageNotFoundMiddleware);
    this.app.use(ErrorMiddleware);
  }

  private routes(): void {
    this.app.use('/todo', TodoRouter);
  }
}

export default new App().app;
