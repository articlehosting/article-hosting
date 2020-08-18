import url from 'url';
import config from '../config';

interface ImageSize {
  width?: number | string;
  height?: number | string;
}

const renderImageUrl = (contentUrl?: string, sizes?: ImageSize): string => {
  const size = sizes ? [sizes.width ?? '', sizes.height ?? ''].join(',') : 'full';

  if (contentUrl) {
    return url.format({
      protocol: config.iiif.useSSL ? 'https' : 'http',
      hostname: config.iiif.hostname,
      port: `${config.iiif.port}`,
      pathname: `iiif/2${contentUrl}/full/${size}/0/default.jpg`,
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
