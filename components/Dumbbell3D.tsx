"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

export function Dumbbell3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 120;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.25, 4.0);
    camera.lookAt(0, 0, 0);

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // 3. Studio Lighting for High-End Gym Metal Aesthetics
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 3.2);
    mainLight.position.set(3, 4, 3);
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0x4a6a78, 1.6);
    fillLight.position.set(-3, -2, 2);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xf21b35, 5.0, 8);
    rimLight.position.set(0, -0.8, -1.8);
    scene.add(rimLight);

    // 4. Realistic Materials
    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xe0e6eb,
      metalness: 0.96,
      roughness: 0.14,
    });

    const ironPlateMat = new THREE.MeshStandardMaterial({
      color: 0x142127,
      metalness: 0.72,
      roughness: 0.32,
    });

    const redCollarMat = new THREE.MeshStandardMaterial({
      color: 0xf21b35,
      metalness: 0.88,
      roughness: 0.22,
    });

    // 5. Build Dumbbell 3D Group
    const dumbbell = new THREE.Group();
    scene.add(dumbbell);

    // Geometries & meshes array for clean disposal
    const disposables: (THREE.BufferGeometry | THREE.Material)[] = [
      chromeMat,
      ironPlateMat,
      redCollarMat,
    ];

    // Central Steel Handle Bar (Horizontal along X)
    const barGeo = new THREE.CylinderGeometry(0.12, 0.12, 2.5, 32);
    barGeo.rotateZ(Math.PI / 2);
    disposables.push(barGeo);
    const barMesh = new THREE.Mesh(barGeo, chromeMat);
    dumbbell.add(barMesh);

    // Competition Anodized Red Collars
    const collarGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.12, 32);
    collarGeo.rotateZ(Math.PI / 2);
    disposables.push(collarGeo);

    const collarL = new THREE.Mesh(collarGeo, redCollarMat);
    collarL.position.x = -0.68;
    dumbbell.add(collarL);

    const collarR = new THREE.Mesh(collarGeo, redCollarMat);
    collarR.position.x = 0.68;
    dumbbell.add(collarR);

    // Helper: Cast-Iron Weight Plates with Chrome Rim Chamfer
    function addPlate(radius: number, thickness: number, xPos: number) {
      const pGeo = new THREE.CylinderGeometry(radius, radius, thickness, 36);
      pGeo.rotateZ(Math.PI / 2);
      disposables.push(pGeo);
      const pMesh = new THREE.Mesh(pGeo, ironPlateMat);
      pMesh.position.x = xPos;
      dumbbell.add(pMesh);

      const rGeo = new THREE.TorusGeometry(radius, 0.02, 16, 36);
      rGeo.rotateY(Math.PI / 2);
      disposables.push(rGeo);
      const rMesh = new THREE.Mesh(rGeo, chromeMat);
      rMesh.position.x = xPos;
      dumbbell.add(rMesh);
    }

    // Left Stepped Olympic Plates
    addPlate(0.5, 0.15, -0.83);
    addPlate(0.7, 0.18, -1.02);
    addPlate(0.9, 0.22, -1.24);

    // Right Stepped Olympic Plates
    addPlate(0.5, 0.15, 0.83);
    addPlate(0.7, 0.18, 1.02);
    addPlate(0.9, 0.22, 1.24);

    // Chrome End Retaining Nuts
    const nutGeo = new THREE.CylinderGeometry(0.17, 0.17, 0.14, 24);
    nutGeo.rotateZ(Math.PI / 2);
    disposables.push(nutGeo);

    const nutL = new THREE.Mesh(nutGeo, chromeMat);
    nutL.position.x = -1.4;
    dumbbell.add(nutL);

    const nutR = new THREE.Mesh(nutGeo, chromeMat);
    nutR.position.x = 1.4;
    dumbbell.add(nutR);

    // 6. GSAP 3D Left-to-Right Continuous Rotation
    const spinTween = gsap.to(dumbbell.rotation, {
      y: "+=" + Math.PI * 2,
      duration: 3.0,
      repeat: -1,
      ease: "none",
    });

    // Subtle physical weight float & tilt
    const tiltTween = gsap.to(dumbbell.rotation, {
      x: 0.12,
      z: 0.06,
      duration: 1.5,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });

    const floatTween = gsap.to(dumbbell.position, {
      y: 0.05,
      duration: 1.2,
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
      disposables.forEach((item) => item.dispose());
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-[280px] sm:w-[320px] h-[115px] sm:h-[130px] flex items-center justify-center filter drop-shadow-[0_10px_26px_rgba(242,27,53,0.4)] pointer-events-none"
    />
  );
}
