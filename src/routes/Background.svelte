<script lang="ts">
	import type { ShaderUniforms } from '$lib/types';
	import { onDestroy } from 'svelte';
	import * as THREE from 'three';

	let canvas: HTMLCanvasElement;

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

    const vec3 BG_COLOR_DARK = vec3(0.31, 0.02, 0.02);
    const vec3 BG_COLOR_LIGHT = vec3(0.02, 0.02, 0.02);
    const vec3 WAVE_COLOR = vec3(0.56, 0.43, 0.31);
    const vec3 MOUSE_COLOR = vec3(0.9, 0.3, 0.2);

    vec3 addColorEffect(vec3 baseColor, vec3 effectColor, float intensity) {
        return baseColor + effectColor * intensity;
    }

    void main() {
        vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);
        vec2 mouse = u_mouse * 2.0 - 1.0;
        float dist = length(uv - mouse * 0.5);
        float gradientFactor = length(uv) * 0.5 + 0.5;
        vec3 bgColor = mix(BG_COLOR_DARK, BG_COLOR_LIGHT, gradientFactor);

        float timeScale = 0.5;
        float waveIntensity = sin(uv.x * 5.0 + u_time * timeScale) *
                            sin(uv.y * 4.0 - u_time * timeScale * 0.5) * 0.05;
        float mouseEffectIntensity = smoothstep(0.5, 0.0, dist) * 0.1;

        vec3 finalColor = bgColor;
        finalColor = addColorEffect(finalColor, WAVE_COLOR, waveIntensity);
        finalColor = addColorEffect(finalColor, MOUSE_COLOR, mouseEffectIntensity);

        gl_FragColor = vec4(finalColor, 1.0);
    }
    `;
	}

	$effect(() => {
		if (!canvas) return;

		const scene = new THREE.Scene();
		const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
		const renderer = new THREE.WebGLRenderer({
			canvas,
			antialias: true,
			alpha: true,
			powerPreference: 'high-performance'
		});

		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

		const clock = new THREE.Clock();

		const uniforms: ShaderUniforms = {
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

		const onWindowResize = () => {
			renderer.setSize(window.innerWidth, window.innerHeight);
			uniforms.u_resolution.value.x = window.innerWidth;
			uniforms.u_resolution.value.y = window.innerHeight;
		};

		const onMouseMove = (e: MouseEvent) => {
			uniforms.u_mouse.value.x = e.clientX / window.innerWidth;
			uniforms.u_mouse.value.y = 1.0 - e.clientY / window.innerHeight;
		};

		window.addEventListener('resize', onWindowResize);
		window.addEventListener('mousemove', onMouseMove);

		let animationFrameId: number;

		const animate = () => {
			animationFrameId = requestAnimationFrame(animate);
			uniforms.u_time.value = clock.getElapsedTime();
			renderer.render(scene, camera);
		};

		animate();

		onDestroy(() => {
			cancelAnimationFrame(animationFrameId);
			window.removeEventListener('resize', onWindowResize);
			window.removeEventListener('mousemove', onMouseMove);
			renderer.dispose();
			geometry.dispose();
			material.dispose();
			clock.stop();
		});
	});
</script>

<canvas bind:this={canvas}></canvas>

<style>
	canvas {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		display: block;
	}
</style>
