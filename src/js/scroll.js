import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import settings from './settings';

class Scroll {
    
    constructor() {

        this.promises = [];
        this.lenis = null;
        this.setup();

    }

    setup() {

        // Initialize Lenis smooth scrolling
        this.lenis = new Lenis({
            smooth: true,
            infinite: true,
            autoRaf: !0,
            lerp: 1,
            duration: 3
        });

        const raf = (time) => {
            this.lenis.raf(time);
            requestAnimationFrame(raf);
        };

        this.lenis.on('scroll', () => ScrollTrigger.update());

        requestAnimationFrame(raf);

    }

    on() {
        this.lenis.start();
    }

    off() {
        this.lenis.stop();
    }

    async gotoIntro () {
        
        const tl = gsap.timeline({
            paused: true
        });

        tl.to(window, {
            scrollTo: {
                y: settings.intro,
                offsetY: -1
            },
            duration: 1,
            delay: 0,
            onStart: () => {
                //this.off();
            },
            onComplete: () => {
                this.loaded = true;
                this.promises.push({ loaded: true });
            }
        });

        tl.play();

        return await Promise.allSettled([tl]);

    }
};

export {
    Scroll
};
