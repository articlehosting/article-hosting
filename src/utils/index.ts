import url from 'url';
import config from '../config';

const renderImageUrl = (contentUrl?: string, size = 1200): string => {
  if (contentUrl) {
    return url.format({
      protocol: config.server.useSSL ? 'https' : 'http',
      hostname: config.server.hostname,
      port: `${config.server.port}`,
      pathname: `${contentUrl}/full/${size},/0/default.jpg`,
    });
  }

  return '';
};

export default {
  renderImageUrl,
};
