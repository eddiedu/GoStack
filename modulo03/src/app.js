import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import * as Sentry from '@sentry/node';
import Youch from 'youch';
import 'express-async-errors';
import routes from './routes';
import sentryConfig from './config/sentry';

import './database';

class App {
  constructor() {
    this.server = express();

    Sentry.init(sentryConfig);

    this.middlewares();
    this.routes();
    this.exceptionHanlder();

    this.server.get('/debug-sentry', function mainHandler(req, res) {
      throw new Error('My first Sentry error!');
    });
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(cors()); // para restringir quando publicar
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.requestHandler());
  }

  exceptionHanlder() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();
        return res.status(500).json(errors);
      }
      return res.status(500).json({ erro: 'Internal Server Error' });
    });
  }
}

// Como as configurações iniciais não devem mais ser executadas
// só o server vai ser exposto
export default new App().server;
