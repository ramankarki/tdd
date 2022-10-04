const { createLogger, transports, format } = require('winston');

const customFormat = format.combine(
  format.timestamp(),
  format.printf(
    (info) =>
      `${new Date(info.timestamp).toLocaleTimeString()}, ${new Date(
        info.timestamp
      ).toDateString()} | version: ${
        process.env.npm_package_version
      } [${info.level.toUpperCase().padEnd(7)}] : ${info.message}`
  )
);

const destinations = [new transports.Console()];
if (process.env.NODE_ENV === 'production') {
  destinations.push(new transports.File({ filename: 'app.log' }));
}

const logger = createLogger({
  transports: destinations,
  level: 'debug',
  format: customFormat,
  silent: process.env.NODE_ENV === 'test',
});

module.exports = logger;

// https://www.digitalocean.com/community/tutorials/how-to-use-winston-to-log-node-js-applications-on-ubuntu-20-04
