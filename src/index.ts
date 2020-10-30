import { createServer } from 'http';
import { createServer as createHttpsServer } from 'https';
import config from './config';
import app from './server/app';

const server = createServer(app.callback());
const { port, httpsPort } = config.server;
server.on('listening', (): void => console.debug('debug', `Server running on port ${port}`));
server.listen(port);

if (process.env.NODE_ENV === 'production') {
  const httpsServer = createHttpsServer(app.callback());

  httpsServer.on('listening', (): void => console.debug('debug', `HTTPS Server running on port ${httpsPort}`));

  httpsServer.listen(httpsPort);
}

export default server;
