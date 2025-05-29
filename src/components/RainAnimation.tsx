'use client';

import { useEffect, useState } from 'react';

interface Raindrop {
  id: number;
  left: number;
  animationDuration: number;
  animationDelay: number;
}

export default function RainAnimation() {
  const [raindrops, setRaindrops] = useState<Raindrop[]>([]);

  useEffect(() => {
    // 生成雨滴
    const drops: Raindrop[] = [];
    for (let i = 0; i < 50; i++) {
      drops.push({
        id: i,
        left: Math.random() * 100,
        animationDuration: Math.random() * 1 + 0.5, // 0.5-1.5秒
        animationDelay: Math.random() * 2, // 0-2秒延遲
      });
    }
    setRaindrops(drops);
  }, []);

  return (
    <>
      <div className="rain-container absolute top-0 left-0 w-full h-full">
        {raindrops.map((drop) => (
          <div
            key={drop.id}
            className="raindrop"
            style={{
              left: `${drop.left}%`,
              animationDuration: `${drop.animationDuration}s`,
              animationDelay: `${drop.animationDelay}s`,
            }}
          />
        ))}
      </div>
    </>
  );
} 