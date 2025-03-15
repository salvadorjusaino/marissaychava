import settings from "./settings";
import Core from "./core";

export default class App {
  
  constructor() {

    console.log(
      `%c${settings.title} \nMade with ❤️ by ${settings.author.name} \n↳ ${settings.author.link}`,
      'color: #000000',
    );

    this.init();
  }

  core() {
    // Initialize core components
    this.appCore = new Core();

  }

  init() {
    this.core();
  }
}
