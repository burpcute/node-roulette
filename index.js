import express from 'express'
import cors from 'cors'
import chalk from 'chalk'
import consign from 'consign'

import config from './config'
import Logger from './src/utils/Logger'
import BuildRoutes from './src/utils/BuildRoutes'

import routeHelloWorld from './src/routes/main.json'
import routeNumbers from './src/routes/numbers.json'

const app = express();
app.use(cors())

consign({cwd: 'src'})
  .include('controllers')
  .into(app);

//Logger
new Logger(app)
console.log('\x1Bc');
app.debug('-----------------------------------------------')
//Routes
const routes = new BuildRoutes(app)
routes.build(routeHelloWorld)
routes.build(routeNumbers)

app.use(express.static('public'));

app.listen(config.port, () => {
  app.log(`[.] Service running in localhost:${config.port}`)
});