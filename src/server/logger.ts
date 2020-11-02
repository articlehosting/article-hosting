import winston, { Logger as WinstonLogger } from 'winston';
import config from '../config';
import Level from '../config/logger-levels';

class Logger {
  private readonly winston: WinstonLogger;

  constructor() {
    this.winston = winston.createLogger({
      level: config.logger.level ?? 'info',
      defaultMeta: config.logger.defaultMeta,
      format: winston.format.json(),
      transports: [
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`
        //
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'debug.log', level: 'debug' }),
        new winston.transports.File({ filename: 'combined.log' }),
      ],
    });

    // if (process.env.NODE_ENV !== 'production') {
    this.winston.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
    // }
  }

  public log<T>(level: Level, message: string, data?: T): void {
    this.winston[level](message, data);
  }
}

const logger = new Logger();

export default logger;
