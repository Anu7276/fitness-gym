"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

// Helper: Procedural diamond knurling texture for the steel handle
function createKnurlTexture() {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.fillStyle = "#d0dce4";
  ctx.fillRect(0, 0, 128, 128);

  ctx.strokeStyle = "#33424d";
  ctx.lineWidth = 1.4;

  // 45-degree diamond crosshatch
  for (let i = -128; i < 256; i += 8) {
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
  grad.addColorStop(0, "#2c3e47");
  grad.addColorStop(0.5, "#1a262c");
  grad.addColorStop(0.85, "#22323a");
  grad.addColorStop(1, "#10181c");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(256, 256, 256, 0, Math.PI * 2);
  ctx.fill();

  // Outer bevel ring
  ctx.strokeStyle = "rgba(255, 255, 255, 0.28)";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(256, 256, 238, 0, Math.PI * 2);
  ctx.stroke();

  // Deep recessed groove track
  ctx.strokeStyle = "rgba(10, 14, 18, 0.9)";
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.arc(256, 256, 180, 0, Math.PI * 2);
  ctx.stroke();

  // Crimson accent groove
  ctx.strokeStyle = "rgba(242, 27, 53, 0.85)";
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.arc(256, 256, 174, 0, Math.PI * 2);
  ctx.stroke();

  // Embossed White Wordmark
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 32px 'Outfit', 'Arial Black', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("FITNESSGYM", 256, 110);

  // Embossed Crimson Weight Label
  ctx.fillStyle = "#F21B35";
  ctx.font = "bold 44px 'Outfit', 'Arial Black', sans-serif";
  ctx.fillText(weightText, 256, 395);

  // Inner chrome axle bushing
  ctx.strokeStyle = "#f8fafc";
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(256, 256, 74, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = "#334155";
  ctx.beginPath();
  ctx.arc(256, 256, 68, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

export function Dumbbell3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 480;
    const height = container.clientHeight || 250;

    // 1. Scene & Camera with Generous Vertical Clearance (Prevents bottom cutoff)
    const scene = new THREE.Scene();
    // Wider 42° FOV centered slightly lower at y=-0.04 guarantees the plates never exit the bottom
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, -0.04, 3.85);
    camera.lookAt(0, -0.04, 0);

    // 2. High-Performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    container.appendChild(renderer.domElement);

    // 3. Multi-Point Studio Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.2);
    scene.add(ambientLight);

    // Front Camera Key Light: keeps faces brightly illuminated when rotating toward camera
    const frontKeyLight = new THREE.DirectionalLight(0xffffff, 3.6);
    frontKeyLight.position.set(0, 2.5, 4.8);
    scene.add(frontKeyLight);

    // Top-Right Specular Chrome Highlight
    const topLight = new THREE.DirectionalLight(0xffffff, 4.0);
    topLight.position.set(3.8, 4.2, 2.8);
    scene.add(topLight);

    // Left Cool-Steel Rim Light
    const leftFill = new THREE.DirectionalLight(0x7dd3fc, 2.6);
    leftFill.position.set(-4.2, -0.6, 2.0);
    scene.add(leftFill);

    // Intense Red Gym Underglow
    const crimsonRim = new THREE.PointLight(0xf21b35, 8.0, 10);
    crimsonRim.position.set(0, -1.0, -1.6);
    scene.add(crimsonRim);

    // Dynamic Orbiting Specular Glint Light that sweeps across rims as dumbbell spins
    const orbitLight = new THREE.PointLight(0xffffff, 3.2, 8);
    orbitLight.position.set(1.4, 1.8, 2.5);
    scene.add(orbitLight);

    // 4. Materials & Textures
    const knurlTexture = createKnurlTexture();
    const plateFaceTex25 = createPlateFaceTexture("25 KG");
    const plateFaceTex15 = createPlateFaceTexture("15 KG");

    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      metalness: 0.98,
      roughness: 0.08,
    });

    const knurledBarMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.94,
      roughness: 0.22,
      map: knurlTexture || undefined,
    });

    const ironBodyMat = new THREE.MeshStandardMaterial({
      color: 0x1b2931,
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

    // Balanced base pitch tilt (~7°) so top chamfers and depth are visible without dipping into bottom
    dumbbell.rotation.x = 0.12;

    // Solid Knurled Steel Center Handle Bar (Length 2.45, Radius 0.125)
    const barGeo = new THREE.CylinderGeometry(0.125, 0.125, 2.45, 36);
    barGeo.rotateZ(Math.PI / 2);
    disposables.push(barGeo);
    const barMesh = new THREE.Mesh(barGeo, knurledBarMat);
    dumbbell.add(barMesh);

    // Polished Chrome Inner Grip Collar Stops
    const stopGeo = new THREE.TorusGeometry(0.175, 0.036, 16, 36);
    stopGeo.rotateY(Math.PI / 2);
    disposables.push(stopGeo);

    const stopL = new THREE.Mesh(stopGeo, chromeMat);
    stopL.position.x = -0.56;
    dumbbell.add(stopL);

    const stopR = new THREE.Mesh(stopGeo, chromeMat);
    stopR.position.x = 0.56;
    dumbbell.add(stopR);

    // Competition Anodized Red Quick-Lock Collars
    const collarGeo = new THREE.CylinderGeometry(0.23, 0.23, 0.14, 36);
    collarGeo.rotateZ(Math.PI / 2);
    disposables.push(collarGeo);

    const collarL = new THREE.Mesh(collarGeo, redCollarMat);
    collarL.position.x = -0.68;
    dumbbell.add(collarL);

    const collarR = new THREE.Mesh(collarGeo, redCollarMat);
    collarR.position.x = 0.68;
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
      const rGeo = new THREE.TorusGeometry(radius, 0.023, 16, 44);
      rGeo.rotateY(Math.PI / 2);
      disposables.push(rGeo);
      const rMesh = new THREE.Mesh(rGeo, chromeMat);
      rMesh.position.x = xPos;
      dumbbell.add(rMesh);
    }

    // Left Stepped Olympic Plate Stack (Calibrated radius: 0.80 outer, 0.64 middle, 0.48 inner)
    addTexturedPlate(0.48, 0.15, -0.84, plate15Materials);
    addTexturedPlate(0.64, 0.18, -1.04, plate25Materials);
    addTexturedPlate(0.80, 0.21, -1.26, plate25Materials);

    // Right Stepped Olympic Plate Stack
    addTexturedPlate(0.48, 0.15, 0.84, plate15Materials);
    addTexturedPlate(0.64, 0.18, 1.04, plate25Materials);
    addTexturedPlate(0.80, 0.21, 1.26, plate25Materials);

    // Mirror-Chrome Heavy End Nuts / Retaining Sleeves
    const nutGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.15, 32);
    nutGeo.rotateZ(Math.PI / 2);
    disposables.push(nutGeo);

    const nutL = new THREE.Mesh(nutGeo, chromeMat);
    nutL.position.x = -1.43;
    dumbbell.add(nutL);

    const nutR = new THREE.Mesh(nutGeo, chromeMat);
    nutR.position.x = 1.43;
    dumbbell.add(nutR);

    // Center axle bolt head detail
    const boltGeo = new THREE.CylinderGeometry(0.10, 0.10, 0.04, 24);
    boltGeo.rotateZ(Math.PI / 2);
    disposables.push(boltGeo);

    const boltL = new THREE.Mesh(boltGeo, redCollarMat);
    boltL.position.x = -1.52;
    dumbbell.add(boltL);

    const boltR = new THREE.Mesh(boltGeo, redCollarMat);
    boltR.position.x = 1.52;
    dumbbell.add(boltR);

    // 6. Impressive 3D Gyroscopic Rotation Animation
    // Continuous 360-degree spin left-to-right (crisp and steady 2.8s loop)
    const spinTween = gsap.to(dumbbell.rotation, {
      y: "+=" + Math.PI * 2,
      duration: 2.8,
      repeat: -1,
      ease: "none",
    });

    // Gentle pitch tilt oscillation (0.07 to 0.16 rad) keeps the plate completely clear of the bottom edge
    const tiltXTween = gsap.to(dumbbell.rotation, {
      x: 0.16,
      duration: 1.8,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });

    // Gyroscopic bank roll oscillation on Z axis (-0.06 to +0.06 rad)
    const rollZTween = gsap.to(dumbbell.rotation, {
      z: 0.06,
      duration: 2.2,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });

    // Gentle floating weight bob
    const floatTween = gsap.to(dumbbell.position, {
      y: 0.03,
      duration: 1.4,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });

    // Orbit specular light sweeps across chrome edges
    const orbitTween = gsap.to(orbitLight.position, {
      x: -1.4,
      y: 2.0,
      z: 3.0,
      duration: 1.9,
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
      tiltXTween.kill();
      rollZTween.kill();
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
      className="w-[350px] sm:w-[450px] md:w-[500px] h-[210px] sm:h-[245px] md:h-[265px] flex items-center justify-center filter drop-shadow-[0_14px_40px_rgba(242,27,53,0.45)] pointer-events-none"
    />
  );
}
