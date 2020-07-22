import { createServer } from 'http';
import config from './config';
import app from './server/app';

const server = createServer(app.callback());
server.on('listening', (): void => console.debug('debug', `Server running on port ${config.server.port}`));

server.listen(config.server.port);

export default server;
