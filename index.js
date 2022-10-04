const app = require('./app');
const port = 8000;
const sequelize = require('./config/database');
const logger = require('./utils/logger');

sequelize.sync();
app.listen(port, () => {
  logger.info(
    `Example app listening on port ${port}. version: ${process.env.npm_package_version}`
  );
});
