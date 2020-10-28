import { createServer } from 'http';
import { createServer as createHttpsServer } from 'https';

import config from './config';
import app from './server/app';

const server = (process.env.NODE_ENV === 'production' ? createHttpsServer : createServer)(app.callback());
server.on('listening', (): void => console.debug('debug', `Server running on port ${config.server.port}`));

server.listen(config.server.port);

export default server;
