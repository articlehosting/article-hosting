import demoArticle from '../../../src/__fixtures__/article';
import renderArticleSidebar from '../../../src/components/article/sidebar';

describe('render article sidebar', () => {
  const result = renderArticleSidebar(demoArticle);

  it('should render article sidebar container', () => {
    expect(result).toContain('<div class="three wide column">');
  });

  it('should render article sidebar items link', () => {
    expect(result).toContain('<a href="/articles/10.34196%2Fijm.00202/"><strong>Article</strong></a>');
  });

  it('should render article header with article download pdf link', () => {
    const identifiers = [
      {
        type: 'PropertyValue',
        name: 'publisher-id',
        propertyID: 'https://registry.identifiers.org/registry/publisher-id',
        value: '001123',
      },
      {
        type: 'PropertyValue',
        name: 'doi',
        propertyID: 'https://registry.identifiers.org/registry/doi',
        value: '1033.123321/ijm.123321',
      },
    ];

    expect(renderArticleSidebar({
      ...demoArticle,
      identifiers,
    })).toContain(`download/${identifiers[0].value}/ijm-${identifiers[0].value}.pdf`);
  });

  it('should not render download PDF when publisherId is undefined', () => {
    const identifiers = [
      {
        type: 'PropertyValue',
        name: 'doi',
        propertyID: 'https://registry.identifiers.org/registry/doi',
        value: '001123',
      },
    ];

    expect(renderArticleSidebar({
      ...demoArticle,
      identifiers,
    })).not.toContain('<strong>Download PDF</strong>');
  });

  it('should render article header with article bibtex citation', () => {
    const identifiers = [
      {
        type: 'PropertyValue',
        name: 'publisher-id',
        propertyID: 'https://registry.identifiers.org/registry/publisher-id',
        value: '001123',
      },
      {
        type: 'PropertyValue',
        name: 'doi',
        propertyID: 'https://registry.identifiers.org/registry/doi',
        value: '1033.123321/ijm.123321',
      },
    ];

    expect(renderArticleSidebar({
      ...demoArticle,
      identifiers,
    })).toContain(`/citation/${encodeURIComponent(identifiers[1].value)}/${identifiers[0].value}.bib`);
  });

  it('should not render article header with article bibtex citation when publisherId is undefined', () => {
    const identifiers = [
      {
        type: 'PropertyValue',
        name: 'doi',
        propertyID: 'https://registry.identifiers.org/registry/doi',
        value: '001123',
      },
    ];

    expect(renderArticleSidebar({
      ...demoArticle,
      identifiers,
    })).not.toContain('<strong>Download BibTex</strong>');
  });

  it('should render article header with article RIS citation', () => {
    const identifiers = [
      {
        type: 'PropertyValue',
        name: 'publisher-id',
        propertyID: 'https://registry.identifiers.org/registry/publisher-id',
        value: '001123',
      },
      {
        type: 'PropertyValue',
        name: 'doi',
        propertyID: 'https://registry.identifiers.org/registry/doi',
        value: '1033.123321/ijm.123321',
      },
    ];

    expect(renderArticleSidebar({
      ...demoArticle,
      identifiers,
    })).toContain(`/citation/${encodeURIComponent(identifiers[1].value)}/${identifiers[0].value}.ris`);
  });

  it('should not render article header with article RIS citation when publisherId is undefined', () => {
    const identifiers = [
      {
        type: 'PropertyValue',
        name: 'doi',
        propertyID: 'https://registry.identifiers.org/registry/doi',
        value: '001123',
      },
    ];

    expect(renderArticleSidebar({
      ...demoArticle,
      identifiers,
    })).not.toContain('<strong>Download RIS</strong>');
  });

  it('should not render article items (article, figures) when doi is undefined', () => {
    const identifiers = [
      {
        type: 'PropertyValue',
        name: 'publisher-id',
        propertyID: 'https://registry.identifiers.org/registry/publisher-id',
        value: '001123',
      },
    ];

    expect(renderArticleSidebar({
      ...demoArticle,
      identifiers,
    })).not.toContain('<strong>Figures and data</strong>');
    expect(renderArticleSidebar({
      ...demoArticle,
      identifiers,
    })).not.toContain('<strong>Article</strong>');
  });
});
