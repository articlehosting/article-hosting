const mainPageTemplate = (pageContent: string): string => `
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
      <link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"/>
    </head>
    <body>
        <div class="ui container vertical masthead center aligned segment">
          ${pageContent}
        </div>
    </body>
    </html>
    `;

export default mainPageTemplate;
