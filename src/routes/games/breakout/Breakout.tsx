import { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';

const BouncingBall = () => {
    const [height, setHeight] = useState(window.innerHeight);
    const [width, setWidth] = useState(window.innerWidth);

    const mountRef = useRef<HTMLDivElement>(null);
    const cameraRef = useRef<THREE.OrthographicCamera>(
        new THREE.OrthographicCamera(),
    );
    const rendererRef = useRef<THREE.WebGLRenderer>(
        new THREE.WebGLRenderer({ antialias: true }),
    );
    const ballRef = useRef<THREE.Mesh>();
    const positionRef = useRef({ x: 0, y: 0 });
    const directionRef = useRef({ x: 1, y: 1 });
    const pxPerSecondRef = useRef(100);
    const ballSize = useRef(50);
    const dimensionsRef = useRef({ width, height });

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
        [],
    );

    // Setup basic animation
    useEffect(() => {
        const currentMount = mountRef.current;
        const scene = new THREE.Scene();
        const renderer = rendererRef.current;

        // Camera
        updateCamera(cameraRef.current, width, height);

        // Renderer
        renderer.setSize(width, height);
        mountRef.current?.appendChild(renderer.domElement);

        // Ball
        const geometry = new THREE.CircleGeometry(ballSize.current);
        const material = new THREE.MeshBasicMaterial({ color: 'red' });
        const ball = new THREE.Mesh(geometry, material);
        scene.add(ball);
        ballRef.current = ball;

        // Animation loop
        let lastFrameTime = 0;
        const animate = (time: DOMHighResTimeStamp) => {
            const { width, height } = dimensionsRef.current;
            const { x: dirX, y: dirY } = directionRef.current;
            const directionRadians = Math.PI / 3; // 60 deg from horizontal
            const deltaTime = (time - lastFrameTime) / 1000; // Convert time to seconds
            lastFrameTime = time;

            // Move the ball
            positionRef.current.x +=
                pxPerSecondRef.current *
                dirX *
                Math.cos(directionRadians) *
                deltaTime;
            positionRef.current.y +=
                pxPerSecondRef.current *
                dirY *
                Math.sin(directionRadians) *
                deltaTime;

            // Bounce logic
            if (
                positionRef.current.x > width / 2 - ballSize.current ||
                positionRef.current.x < -width / 2 + ballSize.current
            ) {
                directionRef.current.x *= -1;
            }
            if (
                positionRef.current.y > height / 2 - ballSize.current ||
                positionRef.current.y < -height / 2 + ballSize.current
            ) {
                directionRef.current.y *= -1;
            }

            ball.position.x = positionRef.current.x;
            ball.position.y = positionRef.current.y;

            renderer.render(scene, cameraRef.current);
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

            updateCamera(cameraRef.current, newWidth, newHeight);
            rendererRef.current.setSize(newWidth, newHeight);
            dimensionsRef.current = { width: newWidth, height: newHeight };
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [updateCamera]);

    return <div className="game" ref={mountRef} />;
};

export default BouncingBall;
