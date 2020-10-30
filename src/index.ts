import { createServer } from 'http';
import config from './config';
import app from './server/app';

const server = createServer(app.callback());
const { port } = config.server;
server.on('listening', (): void => console.debug('debug', `Server running on port ${port}`));
server.listen(port);

// if (process.env.NODE_ENV === 'production') {
//   const httpsPort = config.server.https.port;
//
//   const httpsServer = createHttpsServer(config.server.https.options, app.callback());
//
//   httpsServer.on('listening', (): void => console.debug('debug', `HTTPS Server running on port ${httpsPort}`));
//
//   httpsServer.listen(httpsPort);
// }

export default server;
