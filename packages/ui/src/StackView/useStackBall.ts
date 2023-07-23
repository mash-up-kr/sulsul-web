import { useRef, useState, useEffect } from 'react';
import Matter from 'matter-js';

const STATIC_DENSITY = 15;
const PARTICLE_SIZE = 6;
const PARTICLE_BOUNCYNESS = 0.9;

export const useStackBall = () => {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [constraints, setContraints] = useState<{ width: number; height: number }>();
  const w = constraints?.width ?? 0;
  const h = constraints?.height ?? 0;
  const [scene, setScene] = useState<any>();

  const handleResize = () => {
    const size = boxRef.current?.getBoundingClientRect() as DOMRect;

    setContraints(size);
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
        width: w,
        height: h,
        background: 'transparent',
        wireframes: false,
      },
    });

    const wallOptions = {
      isStatic: true,
      render: {
        fillStyle: 'transparent',
      },
    };

    const ground = Bodies.rectangle(0, h + 50, w + 100, 100, wallOptions);
    const ceiling = Bodies.rectangle(0, -50, w + 100, 100, wallOptions);
    const leftWall = Bodies.rectangle(-50, 0, 100, h + 100, wallOptions);
    const rightWall = Bodies.rectangle(w + 50, 0, 100, h + 100, wallOptions);

    World.add(engine.world, [ground, ceiling, leftWall, rightWall]);

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
      const ceiling = scene.engine.world.bodies[1];
      const leftWall = scene.engine.world.bodies[2];
      const rightWall = scene.engine.world.bodies[3];

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

      Matter.Body.setPosition(ceiling, {
        x: width / 2,
        y: -STATIC_DENSITY / 2,
      });

      Matter.Body.setVertices(ceiling, [
        { x: 0, y: -STATIC_DENSITY },
        { x: width, y: -STATIC_DENSITY },
        { x: width, y: 0 },
        { x: 0, y: 0 },
      ]);

      Matter.Body.setPosition(leftWall, {
        x: -STATIC_DENSITY / 2,
        y: height / 2,
      });

      Matter.Body.setVertices(leftWall, [
        { x: -STATIC_DENSITY, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: height },
        { x: -STATIC_DENSITY, y: height },
      ]);

      Matter.Body.setPosition(rightWall, {
        x: width + STATIC_DENSITY / 2,
        y: height / 2,
      });

      Matter.Body.setVertices(rightWall, [
        { x: width, y: 0 },
        { x: width + STATIC_DENSITY, y: 0 },
        { x: width + STATIC_DENSITY, y: height },
        { x: width, y: height },
      ]);
    }
  }, [scene, constraints]);

  const addBall = (drinkImage: string) => {
    if (scene && constraints) {
      const { width } = constraints;
      const randomX = Math.floor(Math.random() * -width) + width;
      Matter.World.add(
        scene.engine.world,
        Matter.Bodies.circle(randomX, -PARTICLE_SIZE, PARTICLE_SIZE * 10, {
          restitution: PARTICLE_BOUNCYNESS,
          render: {
            sprite: {
              texture: drinkImage,
              xScale: 0.5,
              yScale: 0.5,
            },
          },
        })
      );
    }
  };

  const removeBall = () => {
    if (scene) {
      Matter.World.remove(scene.engine.world, scene.engine.world.bodies[4]);
    }
  };

  return {
    boxRef,
    canvasRef,
    addBall,
    removeBall,
  };
};
