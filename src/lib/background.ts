import * as THREE from 'three';
import type { ShaderUniforms } from './types';

let scene: THREE.Scene;
let camera: THREE.OrthographicCamera;
let renderer: THREE.WebGLRenderer;
let uniforms: ShaderUniforms;
let clock: THREE.Clock;

export function initBackground(canvas: HTMLCanvasElement): void {
    if (!canvas) return;

    scene = new THREE.Scene();
    camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    clock = new THREE.Clock();

    uniforms = {
        u_time: { value: 0.0 },
        u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        u_mouse: { value: new THREE.Vector2(0.0, 0.0) }
    };

    const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: vertexShader(),
        fragmentShader: fragmentShader()
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    window.addEventListener('resize', onWindowResize);
    document.addEventListener('mousemove', (e) => {
        uniforms.u_mouse.value.x = e.clientX / window.innerWidth;
        uniforms.u_mouse.value.y = 1.0 - e.clientY / window.innerHeight;
    });

    animate();
}

function onWindowResize(): void {
    renderer.setSize(window.innerWidth, window.innerHeight);
    uniforms.u_resolution.value.x = window.innerWidth;
    uniforms.u_resolution.value.y = window.innerHeight;
}

function animate(): void {
    requestAnimationFrame(animate);

    uniforms.u_time.value = clock.getElapsedTime();

    renderer.render(scene, camera);
}

function vertexShader(): string {
    return `
    void main() {
      gl_Position = vec4(position, 1.0);
    }
  `;
}

function fragmentShader(): string {
    return `
    uniform float u_time;
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    
    void main() {
      vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);
      
      vec2 mouse = u_mouse * 2.0 - 1.0;
      float dist = length(uv - mouse * 0.5);
      
      vec3 color1 = vec3(0.05, 0.05, 0.1);
      vec3 color2 = vec3(0.1, 0.1, 0.2);
      vec3 bgColor = mix(color1, color2, length(uv) * 0.5 + 0.5);
      
      // Adjust the speed factor here if needed
      float timeScale = 0.5;
      float wave = sin(uv.x * 5.0 + u_time * timeScale) * sin(uv.y * 4.0 - u_time * timeScale * 0.5) * 0.01;
      
      float mouseEffect = smoothstep(0.5, 0.0, dist) * 0.1;
      
      vec3 finalColor = bgColor + wave + mouseEffect;
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `;
}

export function destroyBackground(): void {
    if (renderer) {
        renderer.dispose();
    }

    window.removeEventListener('resize', onWindowResize);

    // Use a proper event handler reference for cleanup
    document.removeEventListener('mousemove', onMouseMove);

    // Stop the clock if needed
    if (clock) {
        clock.stop();
    }
}

const onMouseMove = (e: MouseEvent) => {
    if (uniforms && uniforms.u_mouse) {
        uniforms.u_mouse.value.x = e.clientX / window.innerWidth;
        uniforms.u_mouse.value.y = 1.0 - e.clientY / window.innerHeight;
    }
};
