import url from 'url';
import { turtle } from '@tpluscode/rdf-string';
import clownface from 'clownface';
import { OK } from 'http-status-codes';
import { Next } from 'koa';
import { Article, ArticleContents } from '../components/article/article';
import { NamedNode } from '../rdf/rdf-types';
import { AppContext, AppMiddleware } from '../rdf/rdf-types/context';
import {
  as, hydra, rdf, schema,
} from '../rdf/rdf-types/namespaces';
import Routes from '../rdf/routes-enum';

export type RenderRdfResponse = (ctx: AppContext) => Promise<DataContext>;

export type DataContext = {
  routeName: Routes,
  type: string,
  name: string,
  method: string,
  to?: [
    { routeName: string }, // todo make this generic
    { routeName: string },
  ],
  articles?: Array<Article>,
};

// todo: refactor this in module
// todo make interface for data
function buildGraph(ctx: AppContext, data: DataContext):void {
  const {
    dataFactory: { literal, namedNode }, request, response, router,
  } = ctx;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  const urlNamedNode = (route: string): NamedNode => namedNode(url.resolve(request.origin, router.url(route)));

  // console.log(data);

  const thisUrlNode = urlNamedNode(data.routeName);

  const graph = clownface({
    dataset: response.dataset,
    term: thisUrlNode,
  });

  if (data.to) {
    data.to.forEach(({ routeName }) => {
      graph.addOut(hydra.Collection, as.availableRoutes, (coll) => {
        coll.addOut(hydra.member, schema('WebAPI'), (webApi) => {
          webApi.addOut(schema('url'), urlNamedNode(routeName));
        });
      });
    });
  }

  // if (data.variables && data.variables instanceof Array) {
  //   const varNames = data.variables.map((x) => x as string);
  //   graph.addOut(hydra.Collection, (coll) => {
  //     varNames.forEach((varName) => {
  //       coll.addOut(hydra.variable, (variable) => {
  //         variable.addOut(schema('value'), literal(varName));
  //         variable.addOut(schema('type'), literal('string'));
  //       });
  //     });
  //   });
  // }

  if (request.url === router.url(Routes.ListArticles)) {
    if (data.articles) {
      data.articles.forEach((article: Article) => {
        graph.addOut(schema('Article'), as(`Article/${article.identifiers[0].value}`), (articleNode) => {
          article.about.forEach((about) => {
            articleNode.addOut(schema('about'), as.aboutSection, (aboutNode) => {
              aboutNode
                .addOut(rdf.type, literal(about.type))
                .addOut(schema('name'), literal(about.name));
            });
          });

          article.authors.forEach((author) => {
            articleNode.addOut(schema('author'), as.articleAuthor, (authorNode) => {
              authorNode.addOut(rdf.type, literal(author.type));

              author.emails?.forEach((email) => authorNode.addOut(schema('email'), literal(email)));

              author.familyNames?.forEach((familyName) => authorNode.addOut(schema('familyName'), literal(familyName)));

              author.affiliations.forEach((affiliation) => {
                authorNode.addOut(schema('affiliation'), as.affiliation, (affiliationNode) => {
                  affiliationNode
                    .addOut(rdf.type, literal(affiliation.type))
                    .addOut(schema('name'), literal(affiliation.name));
                  if (affiliation.address) {
                    affiliationNode.addOut(schema('address'), as.address, (addressNode) => {
                      addressNode
                        .addOut(rdf.type, literal(affiliation.address.type))
                        .addOut(schema('addressCountry'), literal(affiliation.address.addressCountry));
                      if (affiliation.address.addressLocality) {
                        addressNode.addOut(schema('addressLocality'), literal(affiliation.address.addressLocality));
                      }
                    });
                  }
                });
              });
            });
          });

          // todo parse context deeper than 1 level.
          // if (content.content) {
          //   content.content.forEach((content2: ArticleContents) => {
          //     contentTypeNode.addOut(rdf.property, content2.type);
          //   });
          // }
          // console.log(content.content);
          // if (content.content) {
          //   contentTypeNode.addOut(rdf.Property, )
          // }
          // articleNode.addList(schema('articleSection'), article.content);

          article.content.forEach((content: ArticleContents, i) => {
            articleNode.addOut(schema('articleSection'), as(`Content/${content.type}${i}`), (contentNode) => {
              contentNode.addOut(rdf.type, literal(content.type));
              // const currentContent: Article = content.content;
            });
          });

          articleNode.addOut(schema.datePublished, as.datePublished, (datePublishedNode) => {
            datePublishedNode.addOut(rdf.type, literal(article.datePublished.type));
            datePublishedNode.addOut(rdf.value, literal(article.datePublished.value));
          });

          article.description.forEach((description) => {
            articleNode.addOut(schema.description, as.description, (descriptionNode) => {
              descriptionNode.addOut(rdf.type, literal(description.type));
            });
          });

          article.files.forEach((file) => {
            articleNode.addOut(schema('file'), as(`file/${file.contentUrl}`), (fileNode) => {
              fileNode.addOut(rdf.type, schema(file.type));
              fileNode.addOut(schema('name'), literal(file.name));
              fileNode.addOut(hydra.property, as(`extension/${file.extension}`), (extensionNode) => extensionNode.addOut(rdf.value, file.extension));
              fileNode.addOut(schema('contentUrl'), literal(file.contentUrl));
            });
          });

          article.identifiers.forEach((identifier) => {
            articleNode.addOut(schema('identifier'), as(`identifier/${identifier.name}`), (identifierNode) => {
              identifierNode.addOut(rdf.type, literal(identifier.type));
              identifierNode.addOut(schema('name'), literal(identifier.name));
            });
          });
        });
      });
    }
  }

  const turtledGraph: string = turtle`${graph.dataset}`.toString();
  // log 'turtle' respresenation of graph, for debug purposes
  console.log(turtledGraph);
}

export default (
  getRdfResponse: RenderRdfResponse,
): AppMiddleware => (
  async (ctx: AppContext, next: Next): Promise<void> => {
    try {
      const response: DataContext = await getRdfResponse(ctx);
      buildGraph(ctx, response);

      ctx.response.status = OK;
    } catch (e) {
      // todo error handling
      console.error(e);
    }
    await next();
  });
