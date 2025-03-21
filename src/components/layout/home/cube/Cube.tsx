import { useEffect, useRef } from 'react';
import './Cube.scss';
import { CyberpunkLink } from './cyberpunk/Cyberpunk';

interface Vec3 {
  x: number;
  y: number;
  z: number;
}

interface Quat {
  x: number;
  y: number;
  z: number;
  w: number;
}

// Vector operations
const Vec3Operations = {
  create: (x: number, y: number, z: number): Vec3 => ({ x, y, z }),
  zero: (): Vec3 => ({ x: 0, y: 0, z: 0 }),
  length: (v: Vec3): number => Math.sqrt(v.x ** 2 + v.y ** 2 + v.z ** 2),
  scale: (v: Vec3, factor: number): Vec3 => ({
    x: v.x * factor,
    y: v.y * factor,
    z: v.z * factor,
  }),
  normalize: (v: Vec3): Vec3 => {
    const length = Vec3Operations.length(v);
    if (length === 0) return v;
    return {
      x: v.x / length,
      y: v.y / length,
      z: v.z / length,
    };
  },
  sub: (v: Vec3, t: Vec3): Vec3 => ({
    x: v.x - t.x,
    y: v.y - t.y,
    z: v.z - t.z,
  }),
  sum: (v: Vec3, t: Vec3): Vec3 => ({
    x: v.x + t.x,
    y: v.y + t.y,
    z: v.z + t.z,
  }),
};

// Quaternion operations
const QuatOperations = {
  create: (x: number, y: number, z: number, w: number): Quat => ({ x, y, z, w }),
  fromAxis: (axis: Vec3): Quat => {
    const angle = Vec3Operations.length(axis);
    const normalizedAxis = Vec3Operations.normalize({ ...axis });
    const half = angle / 2;
    const sinHalf = Math.sin(half);
    const cosHalf = Math.cos(half);

    return {
      x: normalizedAxis.x * sinHalf,
      y: normalizedAxis.y * sinHalf,
      z: normalizedAxis.z * sinHalf,
      w: cosHalf,
    };
  },
  mul: (q: Quat, r: Quat): Quat => ({
    x: q.w * r.x + q.x * r.w + q.y * r.z - q.z * r.y,
    y: q.w * r.y - q.x * r.z + q.y * r.w + q.z * r.x,
    z: q.w * r.z + q.x * r.y - q.y * r.x + q.z * r.w,
    w: q.w * r.w - q.x * r.x - q.y * r.y - q.z * r.z,
  }),
};


export function Cube(){
  const cubeRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({
    down: false,
    lastMove: -10000,
    previous: Vec3Operations.zero(),
  });
  const velocityRef = useRef<Vec3>(Vec3Operations.zero());
  const impulseThisFrameRef = useRef<Vec3>(Vec3Operations.zero());
  const orientRef = useRef<Quat>({ x: 0, y: 0, z: 0, w: 1 });
  const lastUpdateRef = useRef(0);

  const updateCubeTransform = (quat: Quat) => {
    if (cubeRef.current) {
      cubeRef.current.style.transform = 
        `rotate3d(${quat.x}, ${quat.y}, ${quat.z}, ${Math.acos(quat.w) * 2}rad)`;
    }
  };

  const handleMouseDown = (event: MouseEvent | TouchEvent) => {
    event.preventDefault();
    mouseRef.current.down = true;
    velocityRef.current = Vec3Operations.zero();
  };

  const handleMouseUp = () => {
    mouseRef.current.down = false;
  };

  const handleMouseMove = (event: MouseEvent | Touch) => {
    if (!mouseRef.current.down) return;

    const newMouse = Vec3Operations.create(event.clientX, event.clientY, 0);
    const timeDelta = (performance.now() - mouseRef.current.lastMove) / 1000;

    if (timeDelta > 0.1) {
      mouseRef.current.previous = newMouse;
    }

    const delta = Vec3Operations.sub(newMouse, mouseRef.current.previous);
    mouseRef.current.previous = newMouse;
    mouseRef.current.lastMove = performance.now();

    const axis = Vec3Operations.scale(
      Vec3Operations.normalize(Vec3Operations.create(-delta.y, delta.x, 0)),
      Vec3Operations.length(delta) * 0.01
    );

    impulseThisFrameRef.current = Vec3Operations.sum(impulseThisFrameRef.current, axis);
    const rotation = QuatOperations.fromAxis(axis);
    orientRef.current = QuatOperations.mul(rotation, orientRef.current);
    updateCubeTransform(orientRef.current);
  };

  useEffect(() => {
    let animationFrameId: number;
    const cubeElement = cubeRef.current;

    const updateFrame = (timestamp: number) => {
      if (lastUpdateRef.current === 0) {
        lastUpdateRef.current = timestamp;
      }

      const delta = (timestamp - lastUpdateRef.current) / 1000;
      lastUpdateRef.current = timestamp;

      if (mouseRef.current.down) {
        velocityRef.current = Vec3Operations.scale(impulseThisFrameRef.current, 1 / delta);
        impulseThisFrameRef.current = Vec3Operations.zero();
      } else {
        const friction = 3;
        const decay = Math.exp(-delta * friction);
        
        // Add continuous rotation when idle
        if (performance.now() - mouseRef.current.lastMove > 1000) { // Reduced from 10000 to 1000ms
          const impulse = Vec3Operations.scale(
            Vec3Operations.create(0.7, 0.7, -0.7),
            delta * 0.5 // Reduced multiplier for smoother rotation
          );
          velocityRef.current = Vec3Operations.sum(impulse, velocityRef.current);
        }

        const effectiveDelta = friction > 0 ? (1 - decay) / friction : delta;
        const theta = effectiveDelta * Vec3Operations.length(velocityRef.current);

        velocityRef.current = Vec3Operations.scale(velocityRef.current, decay);

        if (friction > 0 && Vec3Operations.length(velocityRef.current) < 0.00001) {
          // Instead of zeroing velocity, add small continuous rotation
          velocityRef.current = Vec3Operations.create(0.1, 0.1, -0.1);
        }

        const axis = Vec3Operations.scale(
          Vec3Operations.normalize(velocityRef.current),
          theta
        );

        const rotation = QuatOperations.fromAxis(axis);
        orientRef.current = QuatOperations.mul(rotation, orientRef.current);
        updateCubeTransform(orientRef.current);
      }

      animationFrameId = requestAnimationFrame(updateFrame);
    };

    const handleTouchMove = (event: TouchEvent) => {
      event.preventDefault();
      const touch = event.changedTouches[0];
      handleMouseMove(touch);
    };

    cubeElement?.addEventListener('mousedown', handleMouseDown);
    cubeElement?.addEventListener('mouseup', handleMouseUp);
    cubeElement?.addEventListener('mousemove', handleMouseMove);
    cubeElement?.addEventListener('touchstart', handleMouseDown, { passive: false });
    cubeElement?.addEventListener('touchend', handleMouseUp);
    cubeElement?.addEventListener('touchmove', handleTouchMove, { passive: false });

    // Start animation
    animationFrameId = requestAnimationFrame(updateFrame);

    // Cleanup function
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      cubeElement?.removeEventListener('mousedown', handleMouseDown);
      cubeElement?.removeEventListener('mouseup', handleMouseUp);
      cubeElement?.removeEventListener('mousemove', handleMouseMove);
      cubeElement?.removeEventListener('touchstart', handleMouseDown);
      cubeElement?.removeEventListener('touchend', handleMouseUp);
      cubeElement?.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div className="home-cxbe__scene">
      <div className="home-cxbe__cube" ref={cubeRef}>
        <div className="home-cxbe__face -front">
            <CyberpunkLink href='https://github.com/nithyarakash-t' content='Github' />
        </div>
        <div className="home-cxbe__face -back">
            <CyberpunkLink href='https://linkedin.com/in/nithyaprakash-t' content='Linkedin' alternate={true} />
        </div>
        <div className="home-cxbe__face -left">
            <CyberpunkLink href='https://nithyaprakash.com' content='Portfolio' />
        </div>
        <div className="home-cxbe__face -right">
        </div>
        <div className="home-cxbe__face -top">
        </div>
        <div className="home-cxbe__face -bottom">
        </div>
      </div>
    </div>
  );
};