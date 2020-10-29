/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import renderMainHeader from './main-header-template';
import config from '../../config';
import { escapeHtml } from '../../utils';
// TODO
// const renderLicenses = (licenses: Array<ArticleLicense>) : Array<string> =>
//   [];

const mainPageTemplate = (pageContent: string, context?: any): string => {
  const title = context?.article ? escapeHtml(context?.article.title) : config.name;
  // const authorsFullNames: Array<string> = context?.article.authors
  //   .map((author: Person) => `${author.givenNames.join(' ')} ${author.familyNames.join(' ')}`);
  // const licenses: Array<string> = renderLicenses(context?.article.licenses);

  // todo add in html
  // ${licenses.map((l) => `<meta name="dc.rights" content="${l}">`).join('\n')}
  return `
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
      <meta name="dc.format" content="text/html">
      <meta name="dc.language" content="${config.rdf.language}">
      <meta name="dc.publisher" content="${config.name}">
      <meta name="dc.title" content="${title}">
      <meta name="dc.identifier" content="doi:${context?.article._id}">
      <meta name="dc.date" content="${context?.article.dateReceived?.value}">


      <title>${title}</title>
      <link type="text/css" rel="stylesheet" href="/css/style.css"/>
      <link type="text/css" rel="stylesheet" href="/css/temp_styles.css"/>
      <script src="/js/behaviour.js" type="text/javascript"></script>
    </head>

    ${renderMainHeader()}

    <main class="u-full-width">
        ${pageContent}
    </main>
    </html>
    `;
};

export default mainPageTemplate;
