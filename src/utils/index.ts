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

export const renderDate = (format = 'mm dd, yy', month = 'long', d = new Date()): string => {
  const monthFormats: any = {
    short: d.toLocaleString('default', { month: 'short' }),
    long: d.toLocaleString('default', { month: 'long' }),
  };
  const moments: any = {
    yy: d.getFullYear(),
    mm: monthFormats[month],
    dd: `${d.getDate()}`.padStart(2, '0'),
  };

  return Object.keys(moments).reduce((result, elem) => result.replace(elem, moments[elem]), format);
};

export default {
  renderImageUrl,
};
