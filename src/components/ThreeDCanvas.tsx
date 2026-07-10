import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function ThreeDCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let width = container.clientWidth;
    let height = container.clientHeight;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xfcfaf6, 0.05);

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7);

    // 3. Renderer Setup with antialiasing and shadow support
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xfff8eb, 0.8);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.5);
    mainLight.position.set(5, 5, 5);
    mainLight.castShadow = true;
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0xbad2bc, 0.6); // soft sage green highlight
    fillLight.position.set(-5, -3, 2);
    scene.add(fillLight);

    // 5. Stylized 3D Coconut Group
    const coconutGroup = new THREE.Group();

    // Exterior Brown Husk (Using standard SphereGeometry with customized material)
    const huskGeo = new THREE.SphereGeometry(1.4, 32, 32, 0, Math.PI * 2, 0.2, Math.PI);
    const huskMat = new THREE.MeshStandardMaterial({
      color: 0x5c4a3c, // coconut brown
      roughness: 0.9,
      metalness: 0.1,
      bumpScale: 0.05,
      side: THREE.DoubleSide
    });
    const husk = new THREE.Mesh(huskGeo, huskMat);
    husk.rotation.x = Math.PI / 2;
    coconutGroup.add(husk);

    // Interior White Meat
    const meatGeo = new THREE.SphereGeometry(1.35, 32, 32, 0, Math.PI * 2, 0.2, Math.PI);
    const meatMat = new THREE.MeshStandardMaterial({
      color: 0xffffff, // coconut meat white
      roughness: 0.6,
      metalness: 0.0,
      side: THREE.DoubleSide
    });
    const meat = new THREE.Mesh(meatGeo, meatMat);
    meat.rotation.x = Math.PI / 2;
    coconutGroup.add(meat);

    // Sweet Condensed Liquid/Cream Center
    const creamGeo = new THREE.SphereGeometry(1.28, 32, 32, 0, Math.PI * 2, 0.2, Math.PI);
    const creamMat = new THREE.MeshStandardMaterial({
      color: 0xfdf7eb, // cream vanilla color
      roughness: 0.2,
      metalness: 0.1,
      roughnessMap: null
    });
    const cream = new THREE.Mesh(creamGeo, creamMat);
    cream.rotation.x = Math.PI / 2;
    coconutGroup.add(cream);

    // Create a whole coconut next to it
    const wholeCoconutGeo = new THREE.SphereGeometry(0.9, 32, 32);
    const wholeCoconutMat = new THREE.MeshStandardMaterial({
      color: 0x483a2f,
      roughness: 0.95,
      metalness: 0.0
    });
    const wholeCoconut = new THREE.Mesh(wholeCoconutGeo, wholeCoconutMat);
    wholeCoconut.position.set(-2, -0.6, -1);
    coconutGroup.add(wholeCoconut);

    // Add 3 spots/eyes to the whole coconut
    for (let i = 0; i < 3; i++) {
      const eyeGeo = new THREE.SphereGeometry(0.1, 16, 16);
      const eyeMat = new THREE.MeshStandardMaterial({ color: 0x221a14, roughness: 1.0 });
      const eye = new THREE.Mesh(eyeGeo, eyeMat);
      
      const angle = (i * Math.PI * 2) / 3;
      eye.position.set(
        -2 + Math.cos(angle) * 0.4,
        -0.2 + Math.sin(angle) * 0.4,
        -0.2
      );
      coconutGroup.add(eye);
    }

    // Leaf shapes floating in the air
    const particlesCount = 24;
    const particlesGroup = new THREE.Group();
    const particleGeometry = new THREE.ConeGeometry(0.08, 0.3, 4);
    const particleMaterial = new THREE.MeshStandardMaterial({
      color: 0x8da190, // Sage green
      roughness: 0.7,
    });

    const particlesData: { mesh: THREE.Mesh; speedY: number; speedRot: number; phase: number }[] = [];

    for (let i = 0; i < particlesCount; i++) {
      const mesh = new THREE.Mesh(particleGeometry, particleMaterial);
      mesh.position.set(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4
      );
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      particlesGroup.add(mesh);

      particlesData.push({
        mesh,
        speedY: 0.005 + Math.random() * 0.01,
        speedRot: 0.01 + Math.random() * 0.02,
        phase: Math.random() * Math.PI * 2
      });
    }

    scene.add(coconutGroup);
    scene.add(particlesGroup);

    setLoading(false);

    // 6. Interactive Mouse Coordinates
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      // Normalize coordinates
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      mouseX = (x / width) * 2 - 1;
      mouseY = -(y / height) * 2 + 1;
    };

    container.addEventListener("mousemove", handleMouseMove);

    // 7. Scroll Tracker for smooth scroll-triggered transitions
    let scrollPercent = 0;
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      scrollPercent = window.scrollY / docHeight;
    };

    window.addEventListener("scroll", handleScroll);

    // 8. Resize Observer (Canvas Sizing best practice)
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        width = entry.contentRect.width || container.clientWidth;
        height = entry.contentRect.height || container.clientHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
      }
    });
    resizeObserver.observe(container);

    // 9. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse tracking interpolation
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Rotate coconut group slowly + combine with mouse
      coconutGroup.rotation.y = elapsedTime * 0.2 + targetX * 0.5;
      coconutGroup.rotation.x = Math.sin(elapsedTime * 0.1) * 0.2 + targetY * 0.4;

      // Scroll-based 3D animations
      // Scale based on scroll
      const scaleValue = 1 + scrollPercent * 0.3;
      coconutGroup.scale.set(scaleValue, scaleValue, scaleValue);
      // Position shifts slightly based on scroll
      coconutGroup.position.x = Math.sin(scrollPercent * Math.PI) * 0.6;
      coconutGroup.position.y = -scrollPercent * 0.5;

      // Animate floating sage leaf particles
      particlesData.forEach((p) => {
        p.mesh.position.y -= p.speedY;
        p.mesh.rotation.x += p.speedRot;
        p.mesh.rotation.y += p.speedRot * 0.5;
        // Sway sideways
        p.mesh.position.x += Math.sin(elapsedTime + p.phase) * 0.003;

        // Reset if fallen off bottom
        if (p.mesh.position.y < -3.5) {
          p.mesh.position.y = 3.5;
          p.mesh.position.x = (Math.random() - 0.5) * 8;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // 10. Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      scene.clear();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[350px] lg:min-h-[450px]" id="3d-interactive-container">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#FCFAF6]/40 z-10">
          <div className="flex flex-col items-center space-y-3">
            <div className="w-10 h-10 border-4 border-[#4A5D4E] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs font-mono text-[#7C6A5E]">Rendering 3D Oasis...</p>
          </div>
        </div>
      )}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
    </div>
  );
}
