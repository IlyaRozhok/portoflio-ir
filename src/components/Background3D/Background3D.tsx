import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import styles from "./Background3D.module.scss";

const Background3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isWebGLAvailable, setIsWebGLAvailable] = useState(true);

  useEffect(() => {
    if (!mountRef.current) return;

    // Check WebGL availability
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setIsWebGLAvailable(false);
        return;
      }
    } catch (e) {
      setIsWebGLAvailable(false);
      return;
    }

    // Scene setup with warm sky gradient
    const scene = new THREE.Scene();

    // Create a warm sunset/sunrise gradient background
    const bgColors = {
      topColor: new THREE.Color("#f8c2b5"), // Soft peach/pink for top
      middleColor: new THREE.Color("#f4e9d9"), // Warm cream for middle
      bottomColor: new THREE.Color("#f9d7c8"), // Warm orange/pink for bottom
    };

    // Create gradient background using a shader
    const bgGeometry = new THREE.PlaneGeometry(2, 2);
    const bgMaterial = new THREE.ShaderMaterial({
      uniforms: {
        topColor: { value: bgColors.topColor },
        middleColor: { value: bgColors.middleColor },
        bottomColor: { value: bgColors.bottomColor },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 topColor;
        uniform vec3 middleColor;
        uniform vec3 bottomColor;
        varying vec2 vUv;
        
        void main() {
          vec3 color;
          if (vUv.y > 0.6) {
            float t = (vUv.y - 0.6) / 0.4;
            color = mix(middleColor, topColor, t);
          } else {
            float t = vUv.y / 0.6;
            color = mix(bottomColor, middleColor, t);
          }
          gl_FragColor = vec4(color, 1.0);
        }
      `,
      depthWrite: false,
    });

    const bgMesh = new THREE.Mesh(bgGeometry, bgMaterial);
    bgMesh.position.z = -1000;
    bgMesh.renderOrder = -1000;
    scene.add(bgMesh);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    camera.position.z = 30;

    // Renderer setup with high quality
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
      stencil: false,
      depth: true,
    });
    renderer.setClearColor(0xf9d7c8, 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Mouse tracking variables
    const mouse = new THREE.Vector2(0, 0);
    const windowHalf = new THREE.Vector2(
      window.innerWidth / 2,
      window.innerHeight / 2
    );

    // Create fluffy cloud texture
    function createCloudTexture() {
      const canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 256;

      const ctx = canvas.getContext("2d");
      if (!ctx) return "";

      // Set background to transparent
      ctx.fillStyle = "rgba(0, 0, 0, 0)";
      ctx.fillRect(0, 0, 256, 256);

      // Create a fluffy cloud by combining multiple radial gradients
      const centers = [
        { x: 128, y: 128, r: 70 }, // Main cloud body
        { x: 90, y: 110, r: 50 }, // Left top
        { x: 160, y: 100, r: 55 }, // Right top
        { x: 70, y: 140, r: 40 }, // Left bottom
        { x: 180, y: 140, r: 45 }, // Right bottom
        { x: 128, y: 90, r: 45 }, // Top center
      ];

      // Draw all cloud puffs
      centers.forEach((center) => {
        const gradient = ctx.createRadialGradient(
          center.x,
          center.y,
          0,
          center.x,
          center.y,
          center.r
        );
        gradient.addColorStop(0, "rgba(255, 255, 255, 1.0)");
        gradient.addColorStop(0.6, "rgba(255, 255, 255, 0.8)");
        gradient.addColorStop(0.8, "rgba(255, 255, 255, 0.3)");
        gradient.addColorStop(1.0, "rgba(255, 255, 255, 0.0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(center.x, center.y, center.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Add a subtle warm tint to the clouds
      ctx.globalCompositeOperation = "multiply";
      ctx.fillStyle = "rgba(255, 240, 230, 0.15)"; // Very subtle warm tint
      ctx.fillRect(0, 0, 256, 256);

      // Add some texture variations
      ctx.globalCompositeOperation = "overlay";
      for (let i = 0; i < 30; i++) {
        const x = Math.random() * 256;
        const y = Math.random() * 256;
        const radius = 10 + Math.random() * 30;

        const noiseGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        noiseGradient.addColorStop(0, "rgba(255, 255, 255, 0.2)");
        noiseGradient.addColorStop(1, "rgba(255, 255, 255, 0.0)");

        ctx.fillStyle = noiseGradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      return canvas.toDataURL();
    }

    // Create a light source to give a sunset/sunrise glow
    const createLightSource = () => {
      // Add a subtle directional light for sunset/sunrise effect
      const sunLight = new THREE.DirectionalLight(0xffd0b0, 0.8);
      sunLight.position.set(-100, 50, 200);
      scene.add(sunLight);

      // Add a subtle ambient light to prevent completely dark areas
      const ambientLight = new THREE.AmbientLight(0xffeedd, 0.5);
      scene.add(ambientLight);

      return { sunLight, ambientLight };
    };

    // Create a cozy cloud field
    const createCloudField = () => {
      const cloudCount = 120; // More clouds for cozier feel
      const positions = new Float32Array(cloudCount * 3);
      const scales = new Float32Array(cloudCount * 3);
      const rotations = new Float32Array(cloudCount);
      const moveFactors = new Float32Array(cloudCount);
      const layerDepths = new Float32Array(cloudCount);

      // Create multilayered clouds
      for (let i = 0; i < cloudCount; i++) {
        // Determine which layer this cloud belongs to
        const layer = Math.floor(Math.random() * 3); // 0 = far, 1 = middle, 2 = close
        layerDepths[i] = layer;

        // Distribute clouds in an arc in the upper part of the view
        const radius = 200 + Math.random() * 800 - layer * 100;
        const theta = Math.random() * Math.PI * 2;
        const phi = (Math.random() * 0.4 + 0.1) * Math.PI; // Keep more clouds in upper part

        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] =
          radius * Math.sin(phi) * Math.sin(theta) + (layer === 2 ? 20 : 100);
        positions[i * 3 + 2] = radius * Math.cos(phi) - layer * 200; // Layer depth adjustment

        // Random scale for each cloud - closer clouds are larger
        const baseScale = 50 + Math.random() * 150;
        const layerScale = baseScale * (1 + layer * 0.5); // Larger clouds in front

        scales[i * 3] = layerScale;
        scales[i * 3 + 1] = layerScale * (0.5 + Math.random() * 0.5);
        scales[i * 3 + 2] = layerScale;

        // Random rotation and slower movement for a cozy, gentle feel
        rotations[i] = Math.random() * Math.PI * 2;
        moveFactors[i] = 0.1 + Math.random() * 0.3; // Slower movement for coziness
      }

      // Create cloud geometries and materials
      const clouds: THREE.Mesh[] = [];
      const cloudTexture = new THREE.TextureLoader().load(createCloudTexture());

      // Create some cluster clouds
      for (let i = 0; i < cloudCount; i++) {
        const planeGeometry = new THREE.PlaneGeometry(1, 1);

        // Vary the opacity based on layer - closer clouds more opaque
        const layer = layerDepths[i];
        const baseOpacity = 0.6 + Math.random() * 0.3;
        const layerOpacity = Math.min(0.95, baseOpacity * (1 + layer * 0.15));

        const cloudMaterial = new THREE.MeshBasicMaterial({
          map: cloudTexture,
          transparent: true,
          opacity: layerOpacity,
          depthWrite: false,
          blending: THREE.NormalBlending,
        });

        const cloud = new THREE.Mesh(planeGeometry, cloudMaterial);
        cloud.position.set(
          positions[i * 3],
          positions[i * 3 + 1],
          positions[i * 3 + 2]
        );
        cloud.scale.set(scales[i * 3], scales[i * 3 + 1], scales[i * 3 + 2]);
        cloud.rotation.z = rotations[i];
        cloud.lookAt(camera.position); // Billboard effect

        // Store additional data for animation
        cloud.userData = {
          moveSpeed: moveFactors[i] * 0.05,
          initialPosition: cloud.position.clone(),
          layer: layerDepths[i],
        };

        clouds.push(cloud);
        scene.add(cloud);
      }

      return {
        objects: clouds,
        update: (time: number) => {
          clouds.forEach((cloud) => {
            const data = cloud.userData;
            const layer = data.layer;

            // Gentler drift with layered parallax effect
            const amplitudeX = 10 + layer * 5; // More movement for closer clouds
            const amplitudeY = 5 + layer * 2;

            cloud.position.x =
              data.initialPosition.x +
              Math.sin(time * data.moveSpeed) * amplitudeX;
            cloud.position.y =
              data.initialPosition.y +
              Math.cos(time * data.moveSpeed * 0.7) * amplitudeY;

            // Always face the camera (billboard effect)
            cloud.lookAt(camera.position);
          });
        },
      };
    };

    // Create and add light sources and clouds
    const lightSource = createLightSource();
    const cloudField = createCloudField();

    // Handle window resize
    const onResize = () => {
      windowHalf.x = window.innerWidth / 2;
      windowHalf.y = window.innerHeight / 2;

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    // Mouse move handler
    const onMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX - windowHalf.x) / windowHalf.x;
      mouse.y = (event.clientY - windowHalf.y) / windowHalf.y;
    };

    // Animation loop
    let frame: number;
    let time = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      time += 0.006; // Slower time progression for more gentle animation

      // Very slow camera movement for cozy feel
      camera.position.x = Math.sin(time * 0.05) * 3;
      camera.position.y = Math.sin(time * 0.04) * 2;
      camera.lookAt(0, 0, 0);

      // Update clouds
      cloudField.update(time);

      // Subtle camera movement with mouse - very gentle
      camera.position.x += (mouse.x * 3 - camera.position.x) * 0.01;
      camera.position.y += (-mouse.y * 3 - camera.position.y) * 0.01;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    // Start animation and add event listeners
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onResize);
    onResize(); // Initial sizing
    animate();

    // Cleanup function
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);

      const currentMount = mountRef.current;
      if (currentMount && currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }

      // Dispose resources
      cloudField.objects.forEach((cloud) => {
        cloud.geometry.dispose();
        (cloud.material as THREE.Material).dispose();
      });

      bgGeometry.dispose();
      (bgMaterial as THREE.Material).dispose();

      renderer.dispose();
    };
  }, []);

  if (!isWebGLAvailable) {
    return (
      <div className={styles.fallbackBackground}>
        <div className={styles.fallbackMessage}>
          Your browser doesn't support WebGL, which is required for the 3D
          background.
        </div>
      </div>
    );
  }

  return <div className={styles.backgroundContainer} ref={mountRef}></div>;
};

export default Background3D;
