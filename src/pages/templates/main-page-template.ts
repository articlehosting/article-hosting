const mainPageTemplate = (pageContent: string): string => `
    <html>
    <head>
      <link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"/>
    </head>
    <body>
        <div class="ui container">
          ${pageContent}
        </div>
    </body>
    </html>
    `;

export default mainPageTemplate;
