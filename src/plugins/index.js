import articleConfig from './article'

class Manager {
  constructor() {
    this.plugins = [];

    this.register(articleConfig)
  }

  register(config) {
    this.plugins.push(config);
  }
}

const manager = new Manager();
export default manager;
