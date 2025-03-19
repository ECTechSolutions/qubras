
import { useEffect, useRef } from "react";

interface AuroraBackgroundProps {
  children: React.ReactNode;
}

export const AuroraBackground = ({ children }: AuroraBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { clientX, clientY } = e;
      const rect = containerRef.current.getBoundingClientRect();
      
      const x = (clientX - rect.left) / rect.width;
      const y = (clientY - rect.top) / rect.height;
      
      containerRef.current.style.setProperty('--x', `${x}`);
      containerRef.current.style.setProperty('--y', `${y}`);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden"
      style={{
        '--x': '0.5',
        '--y': '0.5',
      } as React.CSSProperties}
    >
      <div className="absolute top-[-50%] left-[-50%] right-[-50%] bottom-[-50%] w-[200%] h-[200%] bg-background transform-gpu">
        <div 
          className="absolute top-0 left-0 right-0 bottom-0 opacity-[0.15] mix-blend-normal"
          style={{
            backgroundImage: `
              radial-gradient(
                circle at calc(var(--x) * 100%) calc(var(--y) * 100%), 
                rgba(140, 140, 248, 0.8), 
                transparent 30%
              )
            `,
          }}
        />
        <div 
          className="absolute top-0 left-0 right-0 bottom-0 opacity-[0.15] mix-blend-normal"
          style={{
            backgroundImage: `
              radial-gradient(
                circle at calc((1 - var(--x)) * 100%) calc(var(--y) * 100%), 
                rgba(106, 90, 214, 0.8), 
                transparent 30%
              )
            `,
          }}
        />
        <div 
          className="absolute top-0 left-0 right-0 bottom-0 opacity-[0.15] mix-blend-normal"
          style={{
            backgroundImage: `
              radial-gradient(
                circle at calc(var(--x) * 100%) calc((1 - var(--y)) * 100%), 
                rgba(140, 140, 248, 0.8), 
                transparent 30%
              )
            `,
          }}
        />
        <div 
          className="absolute top-0 left-0 right-0 bottom-0 opacity-[0.15] mix-blend-normal animate-aurora"
          style={{
            backgroundImage: `
              radial-gradient(
                circle at calc((1 - var(--x)) * 100%) calc((1 - var(--y)) * 100%), 
                rgba(106, 90, 214, 0.8), 
                transparent 30%
              )
            `,
          }}
        />
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default AuroraBackground;
