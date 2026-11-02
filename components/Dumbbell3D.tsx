"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

// Helper: High-resolution procedural crosshatch diamond knurling for the chrome bar
function createKnurlTexture() {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.fillStyle = "#d4e0e8";
  ctx.fillRect(0, 0, 256, 256);

  ctx.strokeStyle = "#2c3b47";
  ctx.lineWidth = 1.8;

  // 45-degree diamond crosshatch
  for (let i = -256; i < 512; i += 10) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + 256, 256);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(i, 256);
    ctx.lineTo(i + 256, 0);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(12, 2);
  return texture;
}

// Helper: Olympic competition bumper plate face texture with bold branding & weight markings
function createPlateFaceTexture(weightText = "25 KG", ringColor = "#F21B35") {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Deep matte cast iron slate radial gradient
  const grad = ctx.createRadialGradient(256, 256, 25, 256, 256, 256);
  grad.addColorStop(0, "#2c3e47");
  grad.addColorStop(0.45, "#1c2930");
  grad.addColorStop(0.78, "#22333b");
  grad.addColorStop(1, "#10181c");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(256, 256, 256, 0, Math.PI * 2);
  ctx.fill();

  // Outer bevel ring
  ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(256, 256, 240, 0, Math.PI * 2);
  ctx.stroke();

  // Deep recessed groove track
  ctx.strokeStyle = "rgba(10, 14, 18, 0.9)";
  ctx.lineWidth = 16;
  ctx.beginPath();
  ctx.arc(256, 256, 182, 0, Math.PI * 2);
  ctx.stroke();

  // Vibrant accent ring (Crimson or Competition Cyan/White)
  ctx.strokeStyle = ringColor;
  ctx.lineWidth = 4.5;
  ctx.beginPath();
  ctx.arc(256, 256, 175, 0, Math.PI * 2);
  ctx.stroke();

  // Embossed White Wordmark
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 44px 'Outfit', 'Arial Black', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("FITNESSGYM", 256, 98);

  // Embossed Crimson Weight Label
  ctx.fillStyle = "#F21B35";
  ctx.font = "bold 56px 'Outfit', 'Arial Black', sans-serif";
  ctx.fillText(weightText, 256, 414);

  // Inner chrome axle bushing
  ctx.strokeStyle = "#f8fafc";
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.arc(256, 256, 72, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = "#334155";
  ctx.beginPath();
  ctx.arc(256, 256, 66, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

export function Dumbbell3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 580;
    const height = container.clientHeight || 280;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    // Wider FOV with closer camera gives a powerful, heroic perspective
    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
    camera.position.set(0, 0.18, 3.1);
    camera.lookAt(0, 0, 0);

    // 2. High-Performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.45;
    container.appendChild(renderer.domElement);

    // 3. Multi-Point Studio Lighting Rig for AAA Metallic Reflections
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.2);
    scene.add(ambientLight);

    // Front Camera Key Light: keeps faces brightly illuminated when rotating toward camera
    const frontKeyLight = new THREE.DirectionalLight(0xffffff, 3.8);
    frontKeyLight.position.set(0, 2.8, 5.0);
    scene.add(frontKeyLight);

    // Top-Right Specular Chrome Glint Light
    const topLight = new THREE.DirectionalLight(0xffffff, 4.2);
    topLight.position.set(4.0, 4.5, 3.0);
    scene.add(topLight);

    // Left Cool-Steel Edge Rim Light
    const leftFill = new THREE.DirectionalLight(0x93c5fd, 2.8);
    leftFill.position.set(-4.5, -0.8, 2.0);
    scene.add(leftFill);

    // Intense Red Gym Underglow / Backlight
    const crimsonRim = new THREE.PointLight(0xf21b35, 8.5, 12);
    crimsonRim.position.set(0, -1.2, -1.8);
    scene.add(crimsonRim);

    // Dynamic Orbiting Specular Glint Light that sweeps across rims as dumbbell spins
    const orbitLight = new THREE.PointLight(0xffffff, 3.5, 8);
    orbitLight.position.set(1.5, 1.8, 2.5);
    scene.add(orbitLight);

    // 4. Materials & Textures
    const knurlTexture = createKnurlTexture();
    const plateFaceTex25 = createPlateFaceTexture("25 KG", "#F21B35");
    const plateFaceTex20 = createPlateFaceTexture("20 KG", "#38bdf8");
    const plateFaceTex15 = createPlateFaceTexture("15 KG", "#F21B35");

    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      metalness: 0.98,
      roughness: 0.08,
    });

    const knurledBarMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.94,
      roughness: 0.24,
      map: knurlTexture || undefined,
    });

    const ironBodyMat = new THREE.MeshStandardMaterial({
      color: 0x1f2e37,
      metalness: 0.80,
      roughness: 0.24,
    });

    const plate25Materials = [
      ironBodyMat,
      new THREE.MeshStandardMaterial({
        map: plateFaceTex25 || undefined,
        metalness: 0.74,
        roughness: 0.22,
      }),
      new THREE.MeshStandardMaterial({
        map: plateFaceTex25 || undefined,
        metalness: 0.74,
        roughness: 0.22,
      }),
    ];

    const plate20Materials = [
      ironBodyMat,
      new THREE.MeshStandardMaterial({
        map: plateFaceTex20 || undefined,
        metalness: 0.74,
        roughness: 0.22,
      }),
      new THREE.MeshStandardMaterial({
        map: plateFaceTex20 || undefined,
        metalness: 0.74,
        roughness: 0.22,
      }),
    ];

    const plate15Materials = [
      ironBodyMat,
      new THREE.MeshStandardMaterial({
        map: plateFaceTex15 || undefined,
        metalness: 0.74,
        roughness: 0.22,
      }),
      new THREE.MeshStandardMaterial({
        map: plateFaceTex15 || undefined,
        metalness: 0.74,
        roughness: 0.22,
      }),
    ];

    const redCollarMat = new THREE.MeshStandardMaterial({
      color: 0xf21b35,
      metalness: 0.94,
      roughness: 0.16,
    });

    // Disposables tracker for clean memory management
    const disposables: (THREE.BufferGeometry | THREE.Material | THREE.Texture)[] = [
      chromeMat,
      knurledBarMat,
      ironBodyMat,
      redCollarMat,
      ...plate25Materials,
      ...plate20Materials,
      ...plate15Materials,
    ];
    if (knurlTexture) disposables.push(knurlTexture);
    if (plateFaceTex25) disposables.push(plateFaceTex25);
    if (plateFaceTex20) disposables.push(plateFaceTex20);
    if (plateFaceTex15) disposables.push(plateFaceTex15);

    // 5. Build 3D Olympic Dumbbell Group
    const dumbbell = new THREE.Group();
    scene.add(dumbbell);

    // Solid Knurled Steel Center Handle Bar (Length 2.8, Radius 0.14)
    const barGeo = new THREE.CylinderGeometry(0.14, 0.14, 2.8, 36);
    barGeo.rotateZ(Math.PI / 2);
    disposables.push(barGeo);
    const barMesh = new THREE.Mesh(barGeo, knurledBarMat);
    dumbbell.add(barMesh);

    // Mirror-Chrome Inner Grip Collar Rings
    const stopGeo = new THREE.TorusGeometry(0.20, 0.04, 16, 36);
    stopGeo.rotateY(Math.PI / 2);
    disposables.push(stopGeo);

    const stopL = new THREE.Mesh(stopGeo, chromeMat);
    stopL.position.x = -0.62;
    dumbbell.add(stopL);

    const stopR = new THREE.Mesh(stopGeo, chromeMat);
    stopR.position.x = 0.62;
    dumbbell.add(stopR);

    // Competition Anodized Red Quick-Lock Collars
    const collarGeo = new THREE.CylinderGeometry(0.27, 0.27, 0.16, 36);
    collarGeo.rotateZ(Math.PI / 2);
    disposables.push(collarGeo);

    const collarL = new THREE.Mesh(collarGeo, redCollarMat);
    collarL.position.x = -0.76;
    dumbbell.add(collarL);

    const collarR = new THREE.Mesh(collarGeo, redCollarMat);
    collarR.position.x = 0.76;
    dumbbell.add(collarR);

    // Helper: Add Olympic Bumper Plate with textured faces and chamfered chrome rims
    function addTexturedPlate(
      radius: number,
      thickness: number,
      xPos: number,
      materials: THREE.Material[]
    ) {
      const pGeo = new THREE.CylinderGeometry(radius, radius, thickness, 44);
      pGeo.rotateZ(Math.PI / 2);
      disposables.push(pGeo);
      const pMesh = new THREE.Mesh(pGeo, materials);
      pMesh.position.x = xPos;
      dumbbell.add(pMesh);

      // Polished outer rim chamfer ring
      const rGeo = new THREE.TorusGeometry(radius, 0.026, 16, 44);
      rGeo.rotateY(Math.PI / 2);
      disposables.push(rGeo);
      const rMesh = new THREE.Mesh(rGeo, chromeMat);
      rMesh.position.x = xPos;
      dumbbell.add(rMesh);
    }

    // Left Stepped Olympic Plate Stack (Larger, more commanding radius)
    addTexturedPlate(0.70, 0.18, -0.96, plate15Materials);
    addTexturedPlate(0.94, 0.22, -1.20, plate20Materials);
    addTexturedPlate(1.16, 0.26, -1.48, plate25Materials);

    // Right Stepped Olympic Plate Stack
    addTexturedPlate(0.70, 0.18, 0.96, plate15Materials);
    addTexturedPlate(0.94, 0.22, 1.20, plate20Materials);
    addTexturedPlate(1.16, 0.26, 1.48, plate25Materials);

    // Mirror-Chrome Heavy End Nuts / Retaining Sleeves
    const nutGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.18, 32);
    nutGeo.rotateZ(Math.PI / 2);
    disposables.push(nutGeo);

    const nutL = new THREE.Mesh(nutGeo, chromeMat);
    nutL.position.x = -1.68;
    dumbbell.add(nutL);

    const nutR = new THREE.Mesh(nutGeo, chromeMat);
    nutR.position.x = 1.68;
    dumbbell.add(nutR);

    // Center axle bolt head detail
    const boltGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.05, 24);
    boltGeo.rotateZ(Math.PI / 2);
    disposables.push(boltGeo);

    const boltL = new THREE.Mesh(boltGeo, redCollarMat);
    boltL.position.x = -1.78;
    dumbbell.add(boltL);

    const boltR = new THREE.Mesh(boltGeo, redCollarMat);
    boltR.position.x = 1.78;
    dumbbell.add(boltR);

    // 6. GSAP 3D Left-to-Right Continuous Rotation
    const spinTween = gsap.to(dumbbell.rotation, {
      y: "+=" + Math.PI * 2,
      duration: 3.4,
      repeat: -1,
      ease: "none",
    });

    // Subtle physical weight float & tilt
    const tiltTween = gsap.to(dumbbell.rotation, {
      x: 0.16,
      z: 0.08,
      duration: 1.7,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });

    const floatTween = gsap.to(dumbbell.position, {
      y: 0.07,
      duration: 1.4,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });

    // Orbit light gentle sway for dynamic glints
    const orbitTween = gsap.to(orbitLight.position, {
      x: -1.5,
      z: 3.5,
      duration: 2.2,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });

    // 7. Render Loop
    let animId: number;
    const render = () => {
      animId = requestAnimationFrame(render);
      renderer.render(scene, camera);
    };
    render();

    // 8. Cleanup
    return () => {
      cancelAnimationFrame(animId);
      spinTween.kill();
      tiltTween.kill();
      floatTween.kill();
      orbitTween.kill();
      renderer.dispose();
      disposables.forEach((item) => {
        if ("dispose" in item && typeof item.dispose === "function") {
          item.dispose();
        }
      });
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-[340px] sm:w-[500px] md:w-[600px] lg:w-[640px] h-[210px] sm:h-[260px] md:h-[290px] flex items-center justify-center filter drop-shadow-[0_18px_50px_rgba(242,27,53,0.5)] pointer-events-none"
    />
  );
}
