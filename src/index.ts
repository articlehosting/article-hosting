import { createServer } from 'http';

import config from './config';
import app from './server/app';

const server = createServer(app.callback());
const { port } = config.server;

server.on('listening', (): void => console.debug('debug', `Server running on port ${port}`));

server.listen(port);

export default server;
