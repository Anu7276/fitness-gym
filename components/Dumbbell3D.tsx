"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

// Helper: Procedural crosshatch diamond knurling texture for the steel handle
function createKnurlTexture() {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.fillStyle = "#c8d4dc";
  ctx.fillRect(0, 0, 128, 128);

  ctx.strokeStyle = "#384752";
  ctx.lineWidth = 1.2;

  // 45-degree diamond crosshatch
  for (let i = -128; i < 256; i += 7) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + 128, 128);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(i, 128);
    ctx.lineTo(i + 128, 0);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(10, 2);
  return texture;
}

// Helper: Olympic competition bumper plate face texture with branding and weight markings
function createPlateFaceTexture(weightText = "25 KG") {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Deep matte cast iron slate radial gradient
  const grad = ctx.createRadialGradient(256, 256, 30, 256, 256, 256);
  grad.addColorStop(0, "#283942");
  grad.addColorStop(0.5, "#18242a");
  grad.addColorStop(0.82, "#20313a");
  grad.addColorStop(1, "#0f171b");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(256, 256, 256, 0, Math.PI * 2);
  ctx.fill();

  // Outer bevel ring
  ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(256, 256, 236, 0, Math.PI * 2);
  ctx.stroke();

  // Deep recessed groove track
  ctx.strokeStyle = "rgba(10, 15, 18, 0.8)";
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.arc(256, 256, 178, 0, Math.PI * 2);
  ctx.stroke();

  // Crimson accent groove
  ctx.strokeStyle = "rgba(242, 27, 53, 0.85)";
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.arc(256, 256, 172, 0, Math.PI * 2);
  ctx.stroke();

  // Embossed White Wordmark
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 42px 'Outfit', 'Arial Black', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("FITNESSGYM", 256, 102);

  // Embossed Crimson Weight Label
  ctx.fillStyle = "#F21B35";
  ctx.font = "bold 52px 'Outfit', 'Arial Black', sans-serif";
  ctx.fillText(weightText, 256, 410);

  // Inner chrome axle bushing
  ctx.strokeStyle = "#e2e8f0";
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(256, 256, 68, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = "#334155";
  ctx.beginPath();
  ctx.arc(256, 256, 64, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

export function Dumbbell3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 420;
    const height = container.clientHeight || 190;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 3.8);
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
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // 3. Multi-Point Studio Lighting Setup
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    // Front Key Light (directly illuminates rotating plate faces and wordmarks)
    const frontKeyLight = new THREE.DirectionalLight(0xffffff, 3.0);
    frontKeyLight.position.set(0, 2.5, 4.5);
    scene.add(frontKeyLight);

    // Top-Right Specular Metal Highlight
    const topLight = new THREE.DirectionalLight(0xffffff, 3.2);
    topLight.position.set(3.5, 4.0, 2.5);
    scene.add(topLight);

    // Left Cool-Steel Rim Light
    const leftFill = new THREE.DirectionalLight(0x7dd3fc, 2.0);
    leftFill.position.set(-4.0, -1.0, 1.5);
    scene.add(leftFill);

    // Intense Red Gym Underglow / Backlight
    const crimsonRim = new THREE.PointLight(0xf21b35, 6.5, 10);
    crimsonRim.position.set(0, -1.0, -1.6);
    scene.add(crimsonRim);

    // 4. Materials & Textures
    const knurlTexture = createKnurlTexture();
    const plateFaceTex25 = createPlateFaceTexture("25 KG");
    const plateFaceTex15 = createPlateFaceTexture("15 KG");

    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      metalness: 0.96,
      roughness: 0.12,
    });

    const knurledBarMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.92,
      roughness: 0.28,
      map: knurlTexture || undefined,
    });

    const ironBodyMat = new THREE.MeshStandardMaterial({
      color: 0x1b2830,
      metalness: 0.76,
      roughness: 0.28,
    });

    // Multi-material for plates: index 0 = rim (ironBodyMat), index 1 = top face, index 2 = bottom face
    const plate25Materials = [
      ironBodyMat,
      new THREE.MeshStandardMaterial({
        map: plateFaceTex25 || undefined,
        metalness: 0.72,
        roughness: 0.26,
      }),
      new THREE.MeshStandardMaterial({
        map: plateFaceTex25 || undefined,
        metalness: 0.72,
        roughness: 0.26,
      }),
    ];

    const plate15Materials = [
      ironBodyMat,
      new THREE.MeshStandardMaterial({
        map: plateFaceTex15 || undefined,
        metalness: 0.72,
        roughness: 0.26,
      }),
      new THREE.MeshStandardMaterial({
        map: plateFaceTex15 || undefined,
        metalness: 0.72,
        roughness: 0.26,
      }),
    ];

    const redCollarMat = new THREE.MeshStandardMaterial({
      color: 0xf21b35,
      metalness: 0.92,
      roughness: 0.18,
    });

    // Disposables tracker
    const disposables: (THREE.BufferGeometry | THREE.Material | THREE.Texture)[] = [
      chromeMat,
      knurledBarMat,
      ironBodyMat,
      redCollarMat,
      ...plate25Materials,
      ...plate15Materials,
    ];
    if (knurlTexture) disposables.push(knurlTexture);
    if (plateFaceTex25) disposables.push(plateFaceTex25);
    if (plateFaceTex15) disposables.push(plateFaceTex15);

    // 5. Build 3D Olympic Dumbbell Group
    const dumbbell = new THREE.Group();
    scene.add(dumbbell);

    // Knurled Steel Center Handle Bar (Length 2.6, Radius 0.13)
    const barGeo = new THREE.CylinderGeometry(0.13, 0.13, 2.6, 36);
    barGeo.rotateZ(Math.PI / 2);
    disposables.push(barGeo);
    const barMesh = new THREE.Mesh(barGeo, knurledBarMat);
    dumbbell.add(barMesh);

    // Polished Chrome Bar Grip Stops (inner rings)
    const stopGeo = new THREE.TorusGeometry(0.18, 0.035, 16, 36);
    stopGeo.rotateY(Math.PI / 2);
    disposables.push(stopGeo);

    const stopL = new THREE.Mesh(stopGeo, chromeMat);
    stopL.position.x = -0.58;
    dumbbell.add(stopL);

    const stopR = new THREE.Mesh(stopGeo, chromeMat);
    stopR.position.x = 0.58;
    dumbbell.add(stopR);

    // Competition Anodized Red Quick-Lock Collars
    const collarGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.14, 36);
    collarGeo.rotateZ(Math.PI / 2);
    disposables.push(collarGeo);

    const collarL = new THREE.Mesh(collarGeo, redCollarMat);
    collarL.position.x = -0.72;
    dumbbell.add(collarL);

    const collarR = new THREE.Mesh(collarGeo, redCollarMat);
    collarR.position.x = 0.72;
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
      const rGeo = new THREE.TorusGeometry(radius, 0.024, 16, 44);
      rGeo.rotateY(Math.PI / 2);
      disposables.push(rGeo);
      const rMesh = new THREE.Mesh(rGeo, chromeMat);
      rMesh.position.x = xPos;
      dumbbell.add(rMesh);
    }

    // Left Stepped Olympic Plate Stack
    addTexturedPlate(0.62, 0.16, -0.90, plate15Materials);
    addTexturedPlate(0.85, 0.19, -1.12, plate25Materials);
    addTexturedPlate(1.04, 0.23, -1.36, plate25Materials);

    // Right Stepped Olympic Plate Stack
    addTexturedPlate(0.62, 0.16, 0.90, plate15Materials);
    addTexturedPlate(0.85, 0.19, 1.12, plate25Materials);
    addTexturedPlate(1.04, 0.23, 1.36, plate25Materials);

    // Mirror-Chrome Heavy End Nuts / Retaining Sleeves
    const nutGeo = new THREE.CylinderGeometry(0.20, 0.20, 0.16, 32);
    nutGeo.rotateZ(Math.PI / 2);
    disposables.push(nutGeo);

    const nutL = new THREE.Mesh(nutGeo, chromeMat);
    nutL.position.x = -1.54;
    dumbbell.add(nutL);

    const nutR = new THREE.Mesh(nutGeo, chromeMat);
    nutR.position.x = 1.54;
    dumbbell.add(nutR);

    // Center axle bolt head detail
    const boltGeo = new THREE.CylinderGeometry(0.10, 0.10, 0.04, 24);
    boltGeo.rotateZ(Math.PI / 2);
    disposables.push(boltGeo);

    const boltL = new THREE.Mesh(boltGeo, redCollarMat);
    boltL.position.x = -1.63;
    dumbbell.add(boltL);

    const boltR = new THREE.Mesh(boltGeo, redCollarMat);
    boltR.position.x = 1.63;
    dumbbell.add(boltR);

    // 6. GSAP 3D Left-to-Right Continuous Rotation
    const spinTween = gsap.to(dumbbell.rotation, {
      y: "+=" + Math.PI * 2,
      duration: 3.2,
      repeat: -1,
      ease: "none",
    });

    // Subtle physical weight float & tilt
    const tiltTween = gsap.to(dumbbell.rotation, {
      x: 0.14,
      z: 0.07,
      duration: 1.6,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });

    const floatTween = gsap.to(dumbbell.position, {
      y: 0.06,
      duration: 1.3,
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
      className="w-[330px] sm:w-[420px] md:w-[460px] h-[165px] sm:h-[195px] md:h-[210px] flex items-center justify-center filter drop-shadow-[0_14px_36px_rgba(242,27,53,0.45)] pointer-events-none"
    />
  );
}
