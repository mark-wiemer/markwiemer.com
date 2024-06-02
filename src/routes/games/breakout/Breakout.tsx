import { useRef, useEffect, useState, useCallback } from "react";
import * as THREE from "three";

const BouncingBall = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<THREE.OrthographicCamera>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const ballRef = useRef<THREE.Mesh>();
  const positionYRef = useRef(0);
  const directionRef = useRef(1);

  const [height, setHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth);

  /** Update the camera to view the new given width and height */
  const updateCamera = useCallback(
    (camera: THREE.OrthographicCamera, width: number, height: number) => {
      camera.left = -width / 2;
      camera.right = width / 2;
      camera.top = height / 2;
      camera.bottom = -height / 2;
      camera.near = 1;
      camera.far = 1000;
      camera.position.z = 500;
      camera.updateProjectionMatrix();
    },
    []
  );

  // Setup basic animation
  useEffect(() => {
    const currentMount = mountRef.current;
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.OrthographicCamera();
    cameraRef.current = camera;
    updateCamera(camera, width, height);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    mountRef.current?.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Ball
    const geometry = new THREE.CircleGeometry(50);
    const material = new THREE.MeshBasicMaterial({ color: "red" });
    const ball = new THREE.Mesh(geometry, material);
    scene.add(ball);
    ballRef.current = ball;

    // Animation loop
    const animate = () => {
      // Bounce logic
      positionYRef.current += 5 * directionRef.current;
      if (
        positionYRef.current > height / 2 - 50 ||
        positionYRef.current < -height / 2 + 50
      ) {
        directionRef.current *= -1;
      }
      ball.position.y = positionYRef.current;

      renderer.render(scene, camera);
    };

    renderer.setAnimationLoop(animate);

    // Cleanup on unmount
    return () => {
      currentMount?.removeChild(renderer.domElement);
      renderer.setAnimationLoop(null); // Stop the animation loop
    };
    // Only call this on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update on resize
  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      setWidth(newWidth);
      setHeight(newHeight);

      if (cameraRef.current && rendererRef.current) {
        updateCamera(cameraRef.current, newWidth, newHeight);
        rendererRef.current.setSize(newWidth, newHeight);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [updateCamera]);

  return <div className="game" ref={mountRef} />;
};

export default BouncingBall;
