const mockedConnect = jest.fn();
const mockedClose = jest.fn();
const mockedDb = jest.fn();

jest.mock('mongodb', () => ({
  MongoClient: {
    connect: mockedConnect,
    close: mockedClose,
    db: mockedDb,
  },
}));

// eslint-disable-next-line import/first, import/order
import { MongoClient } from 'mongodb';
// eslint-disable-next-line import/first, import/order
import config from '../../src/config';
// eslint-disable-next-line import/first, import/order
import getDbClient, { close, connect } from '../../src/server/db';

describe('general database mongo-client configuration', (): void => {
  const connection = { close: mockedClose, db: mockedDb };
  const dbName = 'articleHosting';
  const error = new Error('MongoNetworkError: failed to connect to server');

  beforeEach(() => {
    mockedConnect.mockReset();
    mockedClose.mockReset();
    mockedDb.mockReset();
  });

  it('should create connection if connect was called directly and connection not exists', async () => {
    mockedConnect.mockResolvedValueOnce(connection);

    const result = await connect();

    expect(MongoClient.connect).toHaveBeenCalledWith(config.db.mongoUrl, config.db.options);
    expect(result).toBe(connection);
  });

  it('should close connection if connect was called directly and connection already exists', async () => {
    mockedConnect.mockResolvedValue(connection);
    await connect();
    const result = await connect();

    expect(mockedClose).toHaveBeenCalledWith();
    expect(result).toBe(connection);
  });

  it('should throw error if connect was called directly and mongo-client throws error', async () => {
    mockedConnect.mockRejectedValueOnce(error);

    await expect(async () => connect()).rejects.toStrictEqual(error);
  });

  it('should create connection if connection not exists and return mongo-client', async () => {
    mockedConnect.mockResolvedValue(connection);
    mockedDb.mockResolvedValueOnce({});
    await close();
    const result = await getDbClient();

    expect(mockedDb).toHaveBeenCalledWith(dbName);
    expect(result).toStrictEqual({});
  });

  it('should return connection if connection exists', async () => {
    mockedConnect.mockResolvedValue(connection);
    mockedDb.mockResolvedValue({});

    await getDbClient();
    const result = await getDbClient();

    expect(result).toStrictEqual({});
  });

  it('should throw error if connection fails', async () => {
    mockedConnect.mockRejectedValueOnce(error);
    await close();

    await expect(async () => getDbClient()).rejects.toStrictEqual(error);
  });

  it('should unset connection on closing connection', async () => {
    mockedConnect.mockResolvedValue(connection);

    await getDbClient();
    await close();

    expect(mockedClose).toHaveBeenCalledWith();
  });
});
