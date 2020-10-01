import { schema } from '../namespaces';
import Routes from '../routes-enum';

const downloadFileHandler = async (): Promise<Record<string, unknown>> => ({
  routeName: Routes.DownloadFile,
  type: schema.APIReference,
  name: 'Article Metadata: Download File',
  method: 'GET',
  variables: ['publisherId', 'id', 'file'],
});

export default downloadFileHandler;
