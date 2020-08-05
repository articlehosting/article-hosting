const config = {
  server: {
    useSSL: process.env.APP_USESSL ?? true,
    hostname: process.env.APP_HOSTNAME ?? '127.0.0.1',
    port: process.env.APP_PORT ?? 8000,
  },
};

export default config;
