
export default class BuildRoutes {
  constructor(app){
    this.app = app
  }

  build(routes){
    if(!routes) return app.error(`Param 'routes' is undefined`);

    routes.forEach((route) => {
      this.app[route.method](route.path, (req, res) => {
        this.app.controllers[route.controller][route.function](req, res);
      })
      this.app.debug(`[+] Route ${route.path}`)
    })

  }
}