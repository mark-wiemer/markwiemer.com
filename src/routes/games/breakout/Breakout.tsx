import { useRef, useEffect, useState } from "react";
import * as THREE from "three";

// todo make animation not reset on resize
const BouncingBall = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const currentMount = mountRef.current;
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.OrthographicCamera(
      -width / 2, // left
      width / 2, // right
      height / 2, // top
      -height / 2, // bottom
      1, // near
      1000 // far
    );
    camera.position.z = 500;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    mountRef.current?.appendChild(renderer.domElement);

    // Ball
    const geometry = new THREE.CircleGeometry(50);
    const material = new THREE.MeshBasicMaterial({ color: "red" });
    const ball = new THREE.Mesh(geometry, material);
    scene.add(ball);

    // Animation variables
    const speed = 5;
    let positionY = 0;
    let direction = 1;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Bounce logic
      positionY += speed * direction;
      if (positionY > height / 2 - 50 || positionY < -height / 2 + 50) {
        direction *= -1;
      }
      ball.position.y = positionY;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on unmount
    return () => {
      currentMount?.removeChild(renderer.domElement);
    };
  }, [height, width]);

  useEffect(() => {
    addEventListener("resize", () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    });
  });

  return <div className="game" ref={mountRef} />;
};

export default BouncingBall;
