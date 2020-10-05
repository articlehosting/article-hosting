import renderMainHeader from './main-header-template';
import config from '../../config';

// source: https://semantic-ui.com/examples/fixed.html
const mainPageTemplate = (pageContent: string): string => `
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
      <title>${config.name}</title>
      <link type="text/css" rel="stylesheet" href="/css/style.css"/>
    </head>
    <body>
        ${renderMainHeader()}
        <div class="ui main container">
          ${pageContent}
        </div>
    </body>
    </html>
    `;

export default mainPageTemplate;
