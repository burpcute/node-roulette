import express from 'express'
import chalk from 'chalk'
import config from './config'

import Logger from './src/utils/Logger'
import BuildRoutes from './src/utils/BuildRoutes'

const app = express();

//Logger
new Logger(app)

//Routes
const routes = new BuildRoutes(app)

app.use(express.static('public'));

app.listen(config.port, () => {
  console.log('\x1Bc');
  app.debug('-----------------------------------------------')
  app.log(`[.] Service running in localhost:${config.port}`)
});