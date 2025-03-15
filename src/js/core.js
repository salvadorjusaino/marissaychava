import settings from "./settings";
import { preloadImages, goTop, shuffleArray } from './utils';

import { Scroll } from "./scroll";
import { Cursor } from "./cursor";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import simplyCountdown from "simplycountdown.js";
import { Loader } from "./loader";

export default class Core {

    constructor() {
        
        gsap.registerPlugin(ScrollTrigger);

        /* Scroll to the top every time I refresh the page */
        ScrollTrigger.clearScrollMemory("manual");

        this.lenis = null;
        this.ready = false

        // Settings
        this.settings = settings;

        // Initialize custom cursor
        this.scroll = new Scroll();

        // Initialize custom cursor
        this.cursor = new Cursor();

        // Initialize custom Loader
        this.loader = new Loader();

        this.init();
        this.countdown();
    }

    init() {
        // Initialize core methods
        this.scroll.off();
        this.cursor.on();

        this.scroll.gotoIntro().then((response) => {
            
            settings.body.classList.remove('loading');

            this.loader.on().then((response) => {
                this.ready = true;
                this.scroll.on();
            });

        });

    };

    countdown () {
        let myElement = document.querySelector(".countdown");
        simplyCountdown(myElement, {
          year: 2025, // Target year (required)
          month: 10, // Target month [1-12] (required)
          day: 25, // Target day [1-31] (required)
          hours: 0, // Target hour [0-23], default: 0
          minutes: 0, // Target minute [0-59], default: 0
          seconds: 0, // Target second [0-59], default: 0
          countUp: false,
          sectionClass: "countdown__block", // CSS class for each countdown section
          amountClass: "countdown__value", // CSS class for numeric values
          wordClass: "countdown__title",
          words: {
            days: {
              root: "día",
              lambda: (root, n) => (n > 1 ? root + "s" : root),
            },
            hours: {
              root: "hora",
              lambda: (root, n) => (n > 1 ? root + "s" : root),
            },
            minutes: {
              root: "min",
              lambda: (root, n) => (n > 1 ? root + "s" : root),
            },
            seconds: {
              root: "seg",
              lambda: (root, n) => (n > 1 ? root + "s" : root),
            },
          },
          plural: false, // Use plurals for labels
          inline: false, // Inline format: e.g., "24 days, 4 hours, 2 minutes"
        });

    }
};