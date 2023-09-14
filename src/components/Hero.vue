

<script setup lang="ts">

// Imports
import {createShader, createProgram} from "@/shaders/shaderHelpers.js";
import fragment from "@/shaders/hero/fragment.js";
import vertex from "@/shaders/hero/vertex.js";
import {gsap} from "gsap";
import CodeLine from "./CodeLine.vue";
import CodeTag from "./CodeTag.vue";

// Non-reactive WebGL variables
let gl: any = null;
let program: null = null;
let positionBuffer: any = null;
const locations = {
  time: null,
  resolution: null,
  position: null,
  mouse: null,
  zoomOffset: null,
  initialXOffset: null,
  // portfolioScrollPercentage: null
};
let time = 0;
let then = Date.now();

// Reactive WebGL variables
const {width, height} = useWindowSize();
const {x, y} = useMouse();
let outputX = ref(x.value);
let outputY = ref(y.value);
let initialXOffset = ref(1);
const portfolioScrollPercentage = ref(0);

const focused = useWindowFocus();
const canvas = ref(null);
const canvasIsVisible = useElementVisibility(canvas);

let enableRendering = computed(() => {
  if (focused.value === false) {
    return false;
  }
  if (route.path === '/' || route.path === '/portfolio') {
    return true;
  }
  return !!(route.path.startsWith('/portfolio/') && canvasIsVisible.value === true);
});

/**
 * Does the initial work to set up the WebGL context and shaders
 */
const initWebGLComponent = () => {

  // Set up the canvas and WebGL context
  const canvas = document.getElementById('hero-canvas');
  gl = canvas.getContext('webgl');
  if (!gl) {
    return;
  }

  // Create the shaders
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertex);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragment);

  // Create a shader program object to store combined shader program
  program = createProgram(gl, vertexShader, fragmentShader);

  // Prepare the position attribute and buffer
  locations.position = gl.getAttribLocation(program, "position");
  positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  const vertices = new Float32Array([-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0]);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  // Get the location of the time uniform
  locations.time = gl.getUniformLocation(program, "iTime");

  // Get the location of the resolution uniform
  locations.resolution = gl.getUniformLocation(program, "iResolution");

  // Get the location of the mouse uniform
  locations.mouse = gl.getUniformLocation(program, "iMouse");

  // Get the location of the zoom offset uniform
  locations.zoomOffset = gl.getUniformLocation(program, "iZoomOffset");

  // Get the location of the initial X offset uniform
  locations.initialXOffset = gl.getUniformLocation(program, "iInitialXOffset");

  // Get the location of the portfolio scroll percentage uniform
  locations.portfolioScrollPercentage = gl.getUniformLocation(program, "iPortfolioScrollPercentage");

}

/**
 * Updates the WebGL component on every "frame" of the animation.
 */
const renderWebGLComponent = () => {

  if (enableRendering.value === false && time !== 0) {
    requestAnimationFrame(renderWebGLComponent);
    return;
  }

  // Check the frame rate
  let now = Date.now();
  let delta = now - then;

  // Only render if at least 16.67ms (60fps max) has passed
  if (delta > (1000 / 60)) {

    // Set the view port
    gl.viewport(0, 0, width.value, height.value);

    // Clear the canvas
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Enable the depth test
    gl.enable(gl.DEPTH_TEST);

    // Use the program
    gl.useProgram(program);

    // Handle the position buffer update
    gl.enableVertexAttribArray(locations.position);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(locations.position, 2, gl.FLOAT, false, 0, 0);

    // Pass the time uniform
    time++;
    gl.uniform1f(locations.time, time * 0.01);

    // Pass the resolution uniform
    gl.uniform2f(locations.resolution, width.value, height.value);

    // Pass the mouse uniform
    outputX.value += (x.value - outputX.value) * 0.1;
    outputY.value += (y.value - outputY.value) * 0.1;
    gl.uniform2f(locations.mouse, (1 / width.value) * outputX.value, (1 / height.value) * outputY.value);

    // Pass the zoom offset uniform
    gl.uniform1f(locations.zoomOffset, zoomOffset.value);

    // Pass the initial X offset uniform
    gl.uniform1f(locations.initialXOffset, initialXOffset.value);

    // Pass the portfolio scroll percentage uniform
    gl.uniform1f(locations.portfolioScrollPercentage, portfolioScrollPercentage.value);

    // Draw the vertices
    gl.drawArrays(gl.TRIANGLES, 0, 6);

  }

  // Update delta for last frame rate check
  then = Date.now() - (then % (1000 / 60))


  // All done
  requestAnimationFrame(renderWebGLComponent);
}

/**
 * Initialize the WebGL background
 */
onMounted(() => {
  initWebGLComponent();
  requestAnimationFrame(renderWebGLComponent);
  gsap.to(initialXOffset, {
    duration: 7,
    value: 0,
    ease: "power3.out"
  });
});

/**
 * Animate the vertical offset based on the current route.
 * Only the index gets the full hero animation, other routes get the subdued background.
 * @type {*}
 */
const route = useRoute();
let zoomOffset = ref(route.path === '/portfolio' ? 1 : 0);
watch(route, (route) => {
  if (route["path"] === "/portfolio") {
    gsap.to(zoomOffset, {
      duration: 6,
      value: 1,
      ease: "power1.out"
    });
  } else {
    gsap.to(zoomOffset, {
      duration: 6,
      value: 0,
      ease: "power1.inOut"
    });
  }
});

/**
 * Determine the CSS classes to apply to the element
 */
const heroClasses = computed(() => {
  return {
    'hero--about': route.path === '/about',
    'hero--contact': route.path === '/contact',
    'hero--portfolio-single': route.path.startsWith('/portfolio/'),
  }
});

</script>


<template>

  <section id="hero-element" :class="heroClasses" class="overflow-hidden">

    <!-- Hello World -->
    <CodeLine v-if="route.path === '/about'" number="00" class="hello-world">
      <span class="code--purple">console</span>
      <span class="code--white">.</span>
      <span class="code--yellow">log</span>
      <span class="code--white">(</span>
      <span class="code--green">"hello world"</span>
      <span class="code--white">)</span>
      <span class="code--orange">;</span>
    </CodeLine>

    <!-- Import from Orlando -->
    <CodeLine v-if="route.path === '/about'" number="01" class="import-from-orlando">
      <span class="code--orange">const</span>
      <span class="code--yellow">&nbsp;expertise&nbsp;</span>
      <span class="code--white">= [...</span>
      <span class="code--purple">flutter</span>
      <span class="code--white">, ...</span>
      <span class="code--purple">vue&nbsp;</span>
      <span class="code--white">, ...</span>
      <span class="code--purple">nuxt&nbsp;</span>
      <span class="code--white">]</span>
      <span class="code--orange">;</span>
    </CodeLine>

    <!-- Await Fetch Contact -->
    <CodeLine v-if="route.path === '/contact'" number="03" class="await-fetch-contact">
      <span class="code--orange">await</span>
      <span class="code--orange">&nbsp;$fetch</span>
      <span class="code--white">(</span>
      <span class="code--green">"/api/contact"</span>
      <span class="code--white">)</span>
      <span class="code--orange">;</span>
    </CodeLine>

    <!-- @Click Discovery Session -->
    <CodeLine v-if="route.path === '/contact'" number="03" class="click-discovery">
      <span class="code--orange">@click</span>
      <span class="code--white">(e) => { new</span>
      <span class="code--purple">&nbsp;DiscoverySession</span>
      <span class="code--white">(e)</span>
      <span class="code--orange">;</span>
    </CodeLine>

    <!-- Yellow to Orange Gradient Bar -->
    <div class="orange-bar" v-if="route.path === '/about' || route.path === '/contact'"/>

    <!-- JS Icon -->
    <Transition name="icon-pop">
      <svg class="js-icon"
           v-if="route.path === '/about' || route.path === '/contact'" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><path fill="#F7DF1E" d="M0 0h256v256H0V0Z"/><path d="m67.312 213.932l19.59-11.856c3.78 6.701 7.218 12.371 15.465 12.371c7.905 0 12.89-3.092 12.89-15.12v-81.798h24.057v82.138c0 24.917-14.606 36.259-35.916 36.259c-19.245 0-30.416-9.967-36.087-21.996m85.07-2.576l19.588-11.341c5.157 8.421 11.859 14.607 23.715 14.607c9.969 0 16.325-4.984 16.325-11.858c0-8.248-6.53-11.17-17.528-15.98l-6.013-2.58c-17.357-7.387-28.87-16.667-28.87-36.257c0-18.044 13.747-31.792 35.228-31.792c15.294 0 26.292 5.328 34.196 19.247l-18.732 12.03c-4.125-7.389-8.591-10.31-15.465-10.31c-7.046 0-11.514 4.468-11.514 10.31c0 7.217 4.468 10.14 14.778 14.608l6.014 2.577c20.45 8.765 31.963 17.7 31.963 37.804c0 21.654-17.012 33.51-39.867 33.51c-22.339 0-36.774-10.654-43.819-24.574"/></svg>
    </Transition>

    <!-- Vue Icon -->
    <Transition name="icon-pop">
      <svg class="vue-icon w-10"
           v-if="route.path === '/about' || route.path === '/contact'" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 128 128"><path fill="none" d="m0 8.934l49.854.158l14.167 24.47l14.432-24.47L128 8.935l-63.834 110.14zm126.98.637l-24.36.02l-38.476 66.053L25.691 9.592L.942 9.572l63.211 107.89zm-25.149-.008l-22.745.168l-15.053 24.647L49.216 9.73l-22.794-.168l37.731 64.476zm-75.834-.17l23.002.009m-23.002-.01l23.002.01"/><path fill="#35495e" d="m25.997 9.393l23.002.009L64.035 34.36L79.018 9.404L102 9.398L64.15 75.053z"/><path fill="#41b883" d="m.91 9.569l25.067-.172l38.15 65.659L101.98 9.401l25.11.026l-62.966 108.06z"/></svg>
    </Transition>

    <!-- WebGL Container -->
    <div id="hero-canvas__container" :class="heroClasses">

      <div class="hero-canvas__sidebar" :class="heroClasses">
        <CodeTag>VueJs</CodeTag>
        <div class="line-numbers">
          <span class="line-number__line" v-once v-for="i in 50"><span v-if="i < 10">0</span>{{ i }}</span>
        </div>
      </div>
      <!-- <div class="header w-full flex flex-col-reverse items-center justify-center">
          <p class="FN">UTITOFON</p>
          <p class="FN">UDOEKONG</p>
        </div> -->
      <!-- WebGL Canvas -->
      <canvas id="hero-canvas" :class="heroClasses" ref="canvas" :width="width" :height="height" />

    </div>

  </section>
</template>


<style lang="scss" scoped>

body.fixed-webgl {
  #hero-element {
    position: fixed;
    bottom: unset;
  }
}

#hero-element {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: transform 2s cubic-bezier(0.65, 0, 0.15, 1);

  &.hero--about {
    transition-delay: 0.8s;
    transform: translateX(60vw);

    @media screen and (max-width: 1200px) {
      transform: translateX(70vw);
    }

    @media screen and (max-width: 768px) {
      transition-delay: 0s;
      transform: translateX(120vw);
    }
  }

  &.hero--contact {
    transition-delay: 0.8s;
    transform: translateX(-50vw);

    @media screen and (max-width: 1200px) {
      transform: translateX(-65vw);
    }

    @media screen and (max-width: 768px) {
      transition-delay: 0s;
      transform: translateX(-120vw);
    }
  }
}

#hero-canvas__container {
  position: relative;
  width: 100%;
  height: 100%;
  transition: all 1.8s cubic-bezier(0.7, 0, 0, 1);
  border-radius: 0;
  box-shadow: transparent 0 0px 20px -10px, transparent 0px 13px 156px -10px;
  object-fit: cover;
  z-index: -1;
  clip-path: polygon(-10% -10%, 110% -10%, 110% 110%, -10% 110%);
  background-color: #030205;

  &.hero--about {
    transform: scale(0.8) perspective(400px) rotateX(2deg);
    backface-visibility: hidden;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: rgb(50 50 93 / 20%) 0 40px 20px -20px, var(--color-background) -80px 13px 156px -120px;
    transition: all 2.5s cubic-bezier(0.5, 0, 0, 1);
    clip-path: polygon(-10% -10%, 110% -10%, 110% 110%, -10% 110%);

    @media screen and (max-width: 1200px) {
      box-shadow: none;
    }

    @media screen and (max-width: 768px){
      transform: scale(0.9);
    }

  }

  &.hero--contact {
    transform: scale(0.8) perspective(400px) rotateX(2deg);
    backface-visibility: hidden;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: rgb(50 50 93 / 20%) 0 40px 20px -20px, var(--color-background) -80px 13px 156px -120px;
    transition: transform 1.5s cubic-bezier(0.85, 0, 0.15, 1);
    clip-path: polygon(-10% -10%, 110% -10%, 110% 110%, -10% 110%);

    @media screen and (max-width: 1200px) {
      box-shadow: none;
    }

    @media screen and (max-width: 768px){
      transform: scale(0.9);
    }

  }

  &.hero--portfolio-single {
    clip-path: polygon(0 0, 100% 0, 100% 50%, 0 65%);

    @media screen and (max-width: 992px) {
      clip-path: polygon(0 0, 100% 0, 100% 35%, 0 52%);
    }
  }
}

#hero-canvas {
  position: relative;
  width: 100%;
  height: 100%;
}

.hero-canvas__sidebar {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 220px;
  background-color: #333534;
  height: 100%;
  z-index: 2;
  transition: transform 2s cubic-bezier(0.65, 0, 0.15, 1);
  transform: translateX(-100%);
  padding: 20px;

  &.hero--about, &.hero--contact {
    transition: transform 1s cubic-bezier(0.65, 0, 0.15, 1);
    transform: translateX(0);

    @media screen and (max-width: 1200px) {
      transform: translateX(-170px);
    }
  }
}

.line-numbers {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 15px;
  opacity: 0.8;
}

.hello-world {
  position: absolute;
  top: 200px;
  left: 120px;

  @media screen and (max-width: 1200px) {
    display: none;
  }
}

.import-from-orlando {
  position: absolute;
  top: 260px;
  left: 40px;

  @media screen and (max-width: 1200px) {
    display: none;
  }
}

.await-fetch-contact {
  position: absolute;
  bottom: 260px;
  right: 280px;

  @media screen and (max-width: 1200px) {
    display: none;
  }
}

.click-discovery {
  position: absolute;
  bottom: 200px;
  right: 80px;

  @media screen and (max-width: 1200px) {
    display: none;
  }
}

.orange-bar {
  position: absolute;
  bottom: 7.8%;
  left: 25%;
  width: 20%;
  height: 8px;
  background: linear-gradient(to right, #F6F606, #F36C35);
  z-index: 1;
  border-radius: 1px;
  box-shadow: rgba(99, 99, 99, 0.1) 0 2px 8px 0;
  transform: scaleX(0);
  transform-origin: center right;
  animation: orangeBarIn 1s cubic-bezier(0.65, 0, 0.15, 1) forwards;
  animation-delay: 0.8s;
}

@keyframes orangeBarIn {
  0% {
    transform: scaleX(0) translateZ(0);
  }
  100% {
    transform: scaleX(1) translateZ(0);
  }
}

.js-icon {
  position: absolute;
  top: 160px;
  right: 120px;
  width: 140px;
  z-index: 1;

  @media screen and (max-width: 992px) {
    display: none;
  }
}

.vue-icon {
  position: absolute;
  bottom: 140px;
  left: 130px;
  width: 60px;
  z-index: 1;

  @media screen and (max-width: 992px) {
    display: none;
  }
}

.icon-pop-enter-active,
.icon-pop-leave-active {
  transition: all 1s cubic-bezier(0.7, 0, 0, 1);
}

.icon-pop-enter-from, .icon-pop-leave-to {
  opacity: 0;
  transform: scale(0.3);
}

</style>
