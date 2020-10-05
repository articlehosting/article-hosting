import { DataContext } from '../../server/render-rdf-response';
import Routes from '../routes-enum';

// todo move as default behaviour (no ctx) to render-rdf-response
const rdfHandler = async (): Promise<DataContext> => ({
  routeName: Routes.EntryPoint,
  type: 'EntryPoint',
  name: 'Article Hosting RDF Graph',
  method: 'GET',
  to: [
    { routeName: Routes.DownloadFile },
    { routeName: Routes.ListArticles },
  ],
});

export default rdfHandler;
