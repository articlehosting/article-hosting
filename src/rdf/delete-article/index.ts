import { schema } from '../namespaces';
import Routes from '../routes-enum';

const rdfHandler = async (): Promise<Record<string, unknown>> => ({
  root: Routes.EntryPoint,
  type: schema.EntryPoint,
  name: 'Article Hosting RDF Graph',
});

export default rdfHandler;
