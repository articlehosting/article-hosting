import { schema } from '../namespaces';
import Routes from '../routes-enum';

const rdfHandler = async (): Promise<Record<string, unknown>> => ({
  routeName: Routes.EntryPoint,
  type: schema.EntryPoint,
  name: 'Article Hosting RDF Graph',
  method: 'GET',
  to: [
    { routeName: Routes.DownloadFile },
  ],
});

export default rdfHandler;
