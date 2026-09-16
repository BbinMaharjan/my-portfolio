"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type Node = {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  originalPosition: THREE.Vector3;
  mesh: THREE.Mesh;
};

export default function NodeGraphBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const sizeRef = useRef({ width: 0, height: 0 });
  const animationIdRef = useRef<number>();

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    sizeRef.current = { width, height };

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 60;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const nodes: Node[] = [];
    const nodeCount = 80;
    const spread = 55;
    const connectionDistance = 28;
    const repelRadius = 45;
    const repelStrength = 0.08;
    const springStrength = 0.025;
    const damping = 0.88;

    const geometry = new THREE.IcosahedronGeometry(0.45, 0);
    const material = new THREE.MeshBasicMaterial({
      color: 0x3878ff,
      transparent: true,
      opacity: 0.65,
      depthWrite: false,
    });

    for (let i = 0; i < nodeCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = Math.cbrt(Math.random()) * spread;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      const position = new THREE.Vector3(x, y, z);
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.copy(position);
      scene.add(mesh);

      nodes.push({
        position,
        velocity: new THREE.Vector3(),
        originalPosition: position.clone(),
        mesh,
      });
    }

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x3878ff,
      transparent: true,
      opacity: 0.18,
      depthWrite: false,
    });

    const lineGeometry = new THREE.BufferGeometry();
    const maxLines = nodeCount * 6;
    const linePositions = new Float32Array(maxLines * 6);
    lineGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3),
    );
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);

    let targetCameraX = 0;
    let targetCameraY = 0;
    let currentCameraX = 0;
    let currentCameraY = 0;

    // Reused objects for the mouse -> world-space raycast, computed once per
    // frame instead of allocating new Vector3/Raycaster instances every tick.
    const raycaster = new THREE.Raycaster();
    const pointerNDC = new THREE.Vector2();
    // Plane at z = 0, since that's roughly the center of the node cluster's
    // z-range (nodes are distributed in a sphere of radius `spread` around
    // the origin). Intersecting the mouse ray with this plane gives a world
    // position that's actually near the nodes, unlike unprojecting a fixed
    // NDC z value (which lands at an arbitrary, usually-irrelevant depth).
    const mousePlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const mouseWorld = new THREE.Vector3();
    const toMouse = new THREE.Vector3();
    const toOrigin = new THREE.Vector3();

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      const { width, height } = sizeRef.current;
      const { x: mouseX, y: mouseY } = mouseRef.current;

      pointerNDC.set((mouseX / width) * 2 - 1, -(mouseY / height) * 2 + 1);
      raycaster.setFromCamera(pointerNDC, camera);

      // If the ray is parallel to the plane (shouldn't normally happen here)
      // intersectPlane returns null and leaves mouseWorld untouched from the
      // previous frame, which is a safe fallback.
      raycaster.ray.intersectPlane(mousePlane, mouseWorld);

      targetCameraX = (mouseX / width - 0.5) * 4;
      targetCameraY = (mouseY / height - 0.5) * 4;
      currentCameraX += (targetCameraX - currentCameraX) * 0.02;
      currentCameraY += (targetCameraY - currentCameraY) * 0.02;
      camera.position.x += (currentCameraX - camera.position.x) * 0.02;
      camera.position.y += (currentCameraY - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      let lineIndex = 0;

      for (let i = 0; i < nodeCount; i++) {
        const node = nodes[i];

        toMouse.subVectors(node.position, mouseWorld);
        const distToMouse = toMouse.length();

        if (distToMouse < repelRadius && distToMouse > 0.001) {
          const force = (repelRadius - distToMouse) * repelStrength;
          toMouse.normalize().multiplyScalar(force);
          node.velocity.add(toMouse);
        }

        toOrigin.subVectors(node.originalPosition, node.position);
        node.velocity.add(toOrigin.multiplyScalar(springStrength));

        node.velocity.multiplyScalar(damping);
        node.position.add(node.velocity);
        node.mesh.position.copy(node.position);

        const scale = 0.7 + 0.3 * Math.min(distToMouse / repelRadius, 1);
        node.mesh.scale.setScalar(scale);

        const opacity = 0.35 + 0.5 * Math.min(distToMouse / repelRadius, 1);
        (node.mesh.material as THREE.MeshBasicMaterial).opacity = opacity;

        for (let j = i + 1; j < nodeCount; j++) {
          const other = nodes[j];
          const dist = node.position.distanceTo(other.position);

          if (dist < connectionDistance && lineIndex < maxLines) {
            const alpha = 1 - dist / connectionDistance;
            (lineMaterial as THREE.LineBasicMaterial).opacity =
              0.08 + alpha * 0.18;

            linePositions[lineIndex * 6] = node.position.x;
            linePositions[lineIndex * 6 + 1] = node.position.y;
            linePositions[lineIndex * 6 + 2] = node.position.z;
            linePositions[lineIndex * 6 + 3] = other.position.x;
            linePositions[lineIndex * 6 + 4] = other.position.y;
            linePositions[lineIndex * 6 + 5] = other.position.z;
            lineIndex++;
          }
        }
      }

      lineGeometry.setDrawRange(0, lineIndex * 2);
      lineGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      sizeRef.current = { width: newWidth, height: newHeight };
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      geometry.dispose();
      material.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10"
      aria-hidden="true"
    />
  );
}
