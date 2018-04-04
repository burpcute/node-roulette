import chalk from 'chalk'
import moment from 'moment'

export default (app) => {

  app.debug = (message) => {
    if(typeof message === 'object') message = JSON.stringify(message)
    console.log(chalk.gray(`[${moment().format('DD/MM/YYYY HH:mm:ss')}] ${message}`))
  }

  app.log = (message) => {
    if(typeof message === 'object') message = JSON.stringify(message)
    console.log(chalk.green(`[${moment().format('DD/MM/YYYY HH:mm:ss')}] ${message}`))
  }
  app.info = (message) => {
    if(typeof message === 'object') message = JSON.stringify(message)
    console.log(chalk.cyan(`[${moment().format('DD/MM/YYYY HH:mm:ss')}] ${message}`))
  }
  app.warn = (message) => {
    if(typeof message === 'object') message = JSON.stringify(message)
    console.log(chalk.yellow(`[${moment().format('DD/MM/YYYY HH:mm:ss')}] ${message}`))
  }
  app.error = (message) => {
    if(typeof message === 'object') message = JSON.stringify(message)
    console.log(chalk.red(`[${moment().format('DD/MM/YYYY HH:mm:ss')}] ${message}`))
  }

}