import { registerAs } from '@nestjs/config';

import { PROJECT_NAME } from 'environments';
import { format, Logform, transports } from 'winston';

import { CONFIG_KEY } from '../config-key';

const formatter = (): Logform.Format => {
  return format.combine(
    format.timestamp(),
    format.colorize({ all: true }),
    format.errors({ stack: true }),
    format.splat(),
    format.printf(({ level, message, timestamp, ...metadata }) => {
      const date = new Date(timestamp as string);
      const formattedTimestamp = formatDate(date);
      const loggerPrefix = `\x1b[35m[${PROJECT_NAME}]\x1b[0m`;
      let formattedMessage: string;
      try {
        const parsed = JSON.parse(message as string);
        formattedMessage = JSON.stringify(parsed, null, 2)
          .split('\n')
          .map(
            (line) =>
              `${loggerPrefix} ${formattedTimestamp} [${level}] : ${line}`,
          )
          .join('\n');
      } catch (e) {
        // If not valid JSON, use the original message
        formattedMessage = `${loggerPrefix} ${formattedTimestamp} [${level}] : ${message}`;
      }

      // Add metadata if it exists
      if (Object.keys(metadata).length > 0) {
        const formattedMetadata = JSON.stringify(metadata, null, 2);
        formattedMessage += `\nMetadata:\n${formattedMetadata
          .split('\n')
          .map((line) => `  ${line}`)
          .join('\n')}`;
      }

      return formattedMessage;
    }),
  );
};

function formatDate(date: Date): string {
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours() % 12 || 12;
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

  return `${month}/${day}/${year}, ${hours}:${minutes}:${seconds} ${ampm}`;
}

export default registerAs(CONFIG_KEY.LOGGER, () => ({
  transports: [
    new transports.Console({
      format: formatter(),
      level: process.env.LOG_LEVEL || 'info',
      silent: process.env.NODE_ENV === 'test',
    }),
  ],
}));
