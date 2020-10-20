/* eslint-disable @typescript-eslint/restrict-template-expressions */
import renderMainHeader from './main-header-template';
import config from '../../config';
import { escapeHtml } from '../../utils';

const mainPageTemplate = (pageContent: string, context?: any): string => `
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
      <title>${context?.article ? escapeHtml(context?.article.title) : config.name}</title>
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

export default mainPageTemplate;
