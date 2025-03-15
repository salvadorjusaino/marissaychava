import { preloadImages, goTop, shuffleArray } from './utils';
import { customCursor } from "./cursor.js";
import Lenis from 'lenis';
import { gsap } from 'gsap-trial';
import DrawSVGPlugin from "gsap-trial/DrawSVGPlugin";
import { CustomEase } from "gsap-trial/CustomEase";
import { ScrollTrigger } from 'gsap-trial/ScrollTrigger';
import { ScrollToPlugin } from 'gsap-trial/ScrollToPlugin';

gsap.config({ trialWarn: false });

gsap.registerPlugin(ScrollTrigger, CustomEase, DrawSVGPlugin, ScrollToPlugin);

/* Scroll to the top every time I refresh the page */
ScrollTrigger.clearScrollMemory("manual");


// Lenis smooth scrolling
let lenis,
    initHasStarted = !1,
    mm = gsap.matchMedia(),
    panels = gsap.utils.toArray(".section"),
    observer,
    scrollTween;

// Initialize Lenis smooth scrolling
const initSmoothScrolling = () => {

    lenis = new Lenis({
        smooth: true,
        infinite: true,
        autoRaf: !0,
        lerp: 1,
        duration: 3
    });

    const raf = (time) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
    };

    lenis.on('scroll', () => ScrollTrigger.update());

    requestAnimationFrame(raf);

    lenis.start();

};

// repeat first six items by cloning them and appending them to the .grid
const repeatItems = (parentEl, total = 0) => {
    const items = [...parentEl.children];
    for (let i = 0; i <= total - 1; ++i) {
        var cln = items[i].cloneNode(true);
        parentEl.appendChild(cln);
    }
};

//repeatItems(document.querySelector('.grid'), 6);




function goToIntro() {

    const section = document.getElementById('#intro');

    gsap.to(window, {
        scrollTo: {
            y: '#intro',
            offsetY: -1
        },
        duration: 0,
        delay: 0,
        onComplete: () => {

            lenis.start();
            document.body.classList.remove('loading');
            //console.log(`🚀 ~ END...`);
        },
    });

};

function initHome() {

    var a = document.querySelector("#m"),
        b = document.querySelector("#dot"),
        c = document.querySelector("#arissa");

    var tl = gsap.timeline({
        paused: 1,
        onComplete() {

        }
    });

    gsap.set([a, b.c], {
        drawSVG: "100% 100%",
    }),
        gsap.fromTo(
            [a, b.c],
            {
                drawSVG: "100% 100%",
            },
            {
                duration: 0.85,
                ease: CustomEase.create("cubic-bezier", ".29,.23,.02,.99"),
                drawSVG: "100% 0%",
                delay: 0.2,
            }
        );
    
    console.log(`🚀 ~ initHome();`);

};

// GSAP Scroll Triggers
const scroll = () => {

    initHome();

};

// Preload images
preloadImages('.grid__item').then((response) => {

    // Lenis (smooth scrolling)
    initSmoothScrolling();

    goTop();

    // GSAP Scroll Triggers
    scroll();

});
