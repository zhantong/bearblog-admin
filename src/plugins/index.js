import articleConfig from "./article";
import tagConfig from "./tag";
import categoryConfig from "./category";
import attachmentConfig from "./attachment";
import templateConfig from "./template";

class Manager {
  constructor() {
    this.plugins = [];

    this.register(articleConfig);
    this.register(tagConfig);
    this.register(categoryConfig);
    this.register(attachmentConfig);
    this.register(templateConfig);
  }

  register(config) {
    this.plugins.push(config);
  }
}

const manager = new Manager();
export default manager;
