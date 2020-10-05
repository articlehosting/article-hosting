import { DataContext } from '../../server/render-rdf-response';
import Routes from '../routes-enum';

const downloadFileHandler = async (): Promise<DataContext> => ({
  routeName: Routes.DownloadFile,
  type: 'APIReference',
  name: 'Article Metadata: Download File',
  method: 'GET',
  // variables: ['publisherId', 'id', 'file'],
});

export default downloadFileHandler;
