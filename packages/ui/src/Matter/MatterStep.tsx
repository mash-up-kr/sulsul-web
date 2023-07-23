'use client';
/** @jsxImportSource @emotion/react */

import { useEffect, useState, useRef } from 'react';
import Matter from 'matter-js';

const STATIC_DENSITY = 15;
const PARTICLE_SIZE = 6;
const PARTICLE_BOUNCYNESS = 0.9;

// interface MatterStepProps {
//   drinkImage: string;
// }

export const MatterStep = () => {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [constraints, setContraints] = useState<{ width: number; height: number }>();
  const [scene, setScene] = useState<any>();

  const [someStateValue, setSomeStateValue] = useState(false);

  const handleResize = () => {
    const size = boxRef.current?.getBoundingClientRect() as DOMRect;

    setContraints(size);
  };

  const handleClick = () => {
    setSomeStateValue(!someStateValue);
  };

  useEffect(() => {
    const Engine = Matter.Engine;
    const Render = Matter.Render;
    const World = Matter.World;
    const Bodies = Matter.Bodies;

    const engine = Engine.create({});

    const render = Render.create({
      element: boxRef.current ?? undefined,
      engine: engine,
      canvas: canvasRef.current ?? undefined,
      options: {
        width: constraints?.width,
        height: constraints?.height,
        background: 'transparent',
        wireframes: false,
      },
    });

    const floor = Bodies.rectangle(0, 0, 0, STATIC_DENSITY, {
      isStatic: true,
      render: {
        fillStyle: 'blue',
      },
    });

    World.add(engine.world, [floor]);

    Engine.run(engine);
    Render.run(render);

    setContraints(boxRef.current?.getBoundingClientRect());
    setScene(render as any);

    window.addEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (constraints) {
      const { width, height } = constraints;

      if (scene === undefined) return;

      // Dynamically update canvas and bounds
      scene.bounds.max.x = width;
      scene.bounds.max.y = height;
      scene.options.width = width;
      scene.options.height = height;
      scene.canvas.width = width;
      scene.canvas.height = height;

      // Dynamically update floor
      const floor = scene.engine.world.bodies[0];

      Matter.Body.setPosition(floor, {
        x: width / 2,
        y: height + STATIC_DENSITY / 2,
      });

      Matter.Body.setVertices(floor, [
        { x: 0, y: height },
        { x: width, y: height },
        { x: width, y: height + STATIC_DENSITY },
        { x: 0, y: height + STATIC_DENSITY },
      ]);
    }
  }, [scene, constraints]);

  /*eslint-disable */
  useEffect(() => {
    // Add a new "ball" everytime `someStateValue` changes
    if (scene && constraints) {
      let { width } = constraints;
      let randomX = Math.floor(Math.random() * -width) + width;
      Matter.World.add(
        scene.engine.world,
        Matter.Bodies.circle(randomX, -PARTICLE_SIZE, PARTICLE_SIZE * 10, {
          restitution: PARTICLE_BOUNCYNESS,
          // render: {
          //   sprite: {
          //     texture: drinkImage,
          //     xScale: 0.5,
          //     yScale: 0.5,
          //   },
          // },
        })
      );
    }
  }, [scene, someStateValue]);
  /*eslint-enable */

  return (
    <div
      style={{
        position: 'relative',
        background: 'black',
        width: '920px',

        height: '100vh',
        padding: '8px',
      }}
    >
      <button
        style={{
          cursor: 'pointer',
          display: 'block',
          textAlign: 'center',
          marginBottom: '16px',
          width: '100%',
          color: 'red',
        }}
        onClick={() => handleClick()}
      >
        Checkout
      </button>
      <div
        ref={boxRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};
