import express, { NextFunction, Request, Response, Router } from 'express';
import TodoService from '../services/todo.service';
import { HTTP_STATUS_CODES } from '../util/http-status-codes';

class TodoRouter {
  public router: express.Router;

  constructor() {
    console.debug('Initialized TodoRouter');

    this.router = Router();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.addCreateTodoRoute();
    this.addGetTodosRoute();
  }

  private addCreateTodoRoute(): void {
    this.router.post('', async (req: Request, res: Response, next: NextFunction) => {
      try {
        const title = req.body.title;

        await TodoService.create(title);
        res.status(HTTP_STATUS_CODES.OK).send();
      } catch (error) {
        next(error);
      }
    });
  }

  private addGetTodosRoute(): void {
    this.router.get('', async (_req: Request, res: Response, next: NextFunction) => {
      try {
        const response = await TodoService.getAll();
        res.status(HTTP_STATUS_CODES.OK).send(response);
      } catch (error) {
        next(error);
      }
    });
  }
}

export default new TodoRouter().router;
