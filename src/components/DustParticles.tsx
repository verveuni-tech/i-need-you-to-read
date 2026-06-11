import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  left: string;
  size: string;
  delay: string;
  duration: string;
  opacity: number;
}

export const DustParticles: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate a fixed set of realistic dust particles
    const list: Particle[] = Array.from({ length: 24 }).map((_, i) => {
      const size = (Math.random() * 3 + 1).toFixed(1) + 'px';
      const left = (Math.random() * 100).toFixed(1) + '%';
      const delay = (Math.random() * -15).toFixed(1) + 's'; // negative delay so they start pre-animated
      const duration = (Math.random() * 10 + 12).toFixed(1) + 's';
      const opacity = parseFloat((Math.random() * 0.25 + 0.05).toFixed(2));
      return { id: i, left, size, delay, duration, opacity };
    });
    setParticles(list);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden mix-blend-screen select-none">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute bottom-0 rounded-full bg-gold/40 dust-particle blur-[0.5px]"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
};
