import http from 'http';

require('dotenv').config();

import app from './app';
import { ErrorEventHandler } from './event-handlers/error-event-handler';
import { ListeningEventHandler } from './event-handlers/listening-event-handler';

const port = process.env.PORT || 8080;

const server = http.createServer(app);

server.listen(port);

server.on('error', ErrorEventHandler(port));
server.on('listening', ListeningEventHandler(server.address()));
