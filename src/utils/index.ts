import { Article } from '../components/article/article';
import config from '../config';

interface ImageSize {
  width?: number | string;
  height?: number | string;
}

export const renderImageUrl = (imagePath?: string, sizes?: ImageSize): string => {
  const size = sizes ? [sizes.width ?? '', sizes.height ?? ''].join(',') : 'full';

  if (imagePath) {
    return `${config.imageBasePath}/iiif/2/${encodeURIComponent(`${imagePath}`)}/full/${size}/0/default.jpg`;
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

export const getArticleIdentifier = (name: string, article: Article): string | null => {
  const articleIdentifier = article.identifiers.filter(
    (identifier) => identifier.name === name,
  );

  if (articleIdentifier[0] && articleIdentifier[0].value) {
    return articleIdentifier[0].value;
  }

  return null;
};
