import renderMainHeader from './main-header-template';
import config from '../../config';

// source: https://semantic-ui.com/examples/fixed.html
const mainPageTemplate = (pageContent: string): string => `
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
      <title>${config.name}</title>
      <link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"/>
      <style type="text/css">
        body {
          background-color: #FFFFFF;
        }
        .ui.menu .item img.logo {
          margin-right: 1.5em;
        }
        .main.container {
          margin-top: 7em;
        }
        .wireframe {
          margin-top: 2em;
        }
        .ui.footer.segment {
          margin: 5em 0em 0em;
          padding: 5em 0em;
        }
      </style>
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
