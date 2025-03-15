import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { CustomEase } from "gsap/CustomEase";
import settings from './settings';

class Loader {
    
    constructor() {

        this.promises = [];
        this.loaded = false;
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, CustomEase);
        this.setup();

    }

    setup () {

        const tl = gsap.timeline({
            paused: false
        });

        tl.set(".loader_pane", {
            transformOrigin: "50% 0%"
        });
        tl.fromTo(".loader_pane", {
            scaleY: 1
        }, {
            scaleY: 0,
            delay: .5,
            duration: 1.2,
            ease: CustomEase.create("cubic-bezier", ".29,.23,.02,.99"),
            onComplete: () => {
                gsap.set(settings.loader, {
                    display: "none"
                });

                gsap.fromTo(settings.main, {
                    opacity: 0
                }, {
                    duration: 1,
                    ease: CustomEase.create("cubic-bezier", ".29,.23,.02,.99"),
                    opacity: 1,
                    delay: 0,
                });

            }
        });

        tl.play();

        /*tl.fromTo(settings.main, {
            opacity: 0
        }, {
            duration: 2,
            ease: CustomEase.create("cubic-bezier", ".29,.23,.02,.99"),
            opacity: 1,
            delay: 1,
            onComplete: () => {
                console.log(`🚀 ~ onComplete`);
            }
        });

        */

    }

    async on () {
    
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

    off() {
    }

};

export {
    Loader
};