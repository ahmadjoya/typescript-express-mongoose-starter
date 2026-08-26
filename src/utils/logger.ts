import { existsSync, mkdirSync } from 'fs';
import { isAbsolute, resolve } from 'path';
import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';
import { LOG_DIR } from '@config';

// logs dir - a relative LOG_DIR is resolved against the project root (process.cwd()) so that logs
// land in the same place whether the app runs from src/ via ts-node or from the compiled dist/.
const logDir: string = isAbsolute(LOG_DIR) ? LOG_DIR : resolve(process.cwd(), LOG_DIR);

/**
 * Read-only filesystems (serverless platforms such as Vercel or AWS Lambda) cannot host
 * a log directory. Rather than crashing at import time we fall back to console-only logging.
 */
const fileLoggingEnabled = ((): boolean => {
  try {
    if (!existsSync(logDir)) mkdirSync(logDir, { recursive: true });
    return true;
  } catch {
    // eslint-disable-next-line no-console
    console.warn(`[logger] Could not create log directory "${logDir}" - falling back to console logging only.`);
    return false;
  }
})();

// Define log format
const logFormat = winston.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`);

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const fileTransports: winston.transport[] = fileLoggingEnabled
  ? [
      // debug log setting
      new winstonDaily({
        level: 'debug',
        datePattern: 'YYYY-MM-DD',
        dirname: resolve(logDir, 'debug'), // log file /logs/debug/*.log in save
        filename: `%DATE%.log`,
        maxFiles: 30, // 30 Days saved
        json: false,
        zippedArchive: true,
      }),
      // error log setting
      new winstonDaily({
        level: 'error',
        datePattern: 'YYYY-MM-DD',
        dirname: resolve(logDir, 'error'), // log file /logs/error/*.log in save
        filename: `%DATE%.log`,
        maxFiles: 30, // 30 Days saved
        handleExceptions: true,
        json: false,
        zippedArchive: true,
      }),
    ]
  : [];

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    logFormat,
  ),
  transports: fileTransports,
  // Tests are noisy enough without a full request log
  silent: process.env.NODE_ENV === 'test',
});

logger.add(
  new winston.transports.Console({
    format: winston.format.combine(winston.format.splat(), winston.format.colorize()),
  }),
);

const stream = {
  write: (message: string) => {
    logger.info(message.trimEnd());
  },
};

export { logger, stream };
