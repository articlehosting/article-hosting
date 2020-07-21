import config from './config';
import server from './server';

server.on('listening', (): void => console.debug('debug', 'Server running'));

server.listen(config.server.port);
