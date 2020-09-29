import demoArticle from '../../../src/__fixtures__/article';
import renderArticleSidebar from '../../../src/components/article/sidebar';

describe('render article sidebar', () => {
  const identifiers = [
    {
      type: 'PropertyValue',
      name: 'publisher-id',
      propertyID: 'https://registry.identifiers.org/registry/publisher-id',
      value: 'ijm-00202',
    },
    {
      type: 'PropertyValue',
      name: 'doi',
      propertyID: 'https://registry.identifiers.org/registry/doi',
      value: '1033.123321/ijm.123321',
    },
  ];
  const contentUrl = 'ijm-00202';

  it('should render article sidebar container', () => {
    expect(renderArticleSidebar({
      ...demoArticle,
      identifiers,
    })).toContain('<div class="three wide column">');
  });

  it('should render article sidebar items link', () => {
    expect(renderArticleSidebar({
      ...demoArticle,
      identifiers,
    })).toContain(`<a href="/articles/${identifiers[1].value}/"><strong>Article</strong></a>`);
  });

  it('should render article header with article download pdf link', () => {
    expect(renderArticleSidebar({
      ...demoArticle,
      identifiers,
    })).toContain(`download/${identifiers[1].value}/${contentUrl}.pdf`);
  });

  it('should not render download PDF when doi is undefined', () => {
    const identifiersPublisherId = [
      {
        type: 'PropertyValue',
        name: 'publisher-id',
        propertyID: 'https://registry.identifiers.org/registry/publisher-id',
        value: 'ijm-00202',
      },
    ];

    expect(renderArticleSidebar({
      ...demoArticle,
      identifiers: identifiersPublisherId,
    })).not.toContain('<strong>Download PDF</strong>');
  });

  it('should render article header with article bibtex citation', () => {
    expect(renderArticleSidebar({
      ...demoArticle,
      identifiers,
    })).toContain(`/citation/${identifiers[1].value}/ijm.123321.bib`);
  });

  it('should not render article header with article bibtex citation when publisherId is undefined', () => {
    const identifiersDoi = [
      {
        type: 'PropertyValue',
        name: 'doi',
        propertyID: 'https://registry.identifiers.org/registry/doi',
        value: 'ijm-00202',
      },
    ];

    expect(renderArticleSidebar({
      ...demoArticle,
      identifiers: identifiersDoi,
    })).not.toContain('<strong>Download BibTex</strong>');
  });

  it('should render article header with article RIS citation', () => {
    expect(renderArticleSidebar({
      ...demoArticle,
      identifiers,
    })).toContain(`/citation/${identifiers[1].value}/ijm.123321.ris`);
  });

  it('should not render article header with article RIS citation when publisherId is undefined', () => {
    const identifiersDoi = [
      {
        type: 'PropertyValue',
        name: 'doi',
        propertyID: 'https://registry.identifiers.org/registry/doi',
        value: 'ijm-00202',
      },
    ];

    expect(renderArticleSidebar({
      ...demoArticle,
      identifiers: identifiersDoi,
    })).not.toContain('<strong>Download RIS</strong>');
  });

  it('should not render article items (article, figures) when doi is undefined', () => {
    const identifiersPublisher = [
      {
        type: 'PropertyValue',
        name: 'publisher-id',
        propertyID: 'https://registry.identifiers.org/registry/publisher-id',
        value: 'ijm-00202',
      },
    ];

    expect(renderArticleSidebar({
      ...demoArticle,
      identifiers: identifiersPublisher,
    })).not.toContain('<strong>Figures and data</strong>');
    expect(renderArticleSidebar({
      ...demoArticle,
      identifiers: identifiersPublisher,
    })).not.toContain('<strong>Article</strong>');
  });
});
