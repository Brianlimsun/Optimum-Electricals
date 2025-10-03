import { useRef, useEffect } from 'react';
import './Squares.css';

interface SquaresProps {
  direction?: 'up' | 'down' | 'left' | 'right' | 'diagonal';
  speed?: number;
  borderColor?: string;
  squareSize?: number;
  hoverFillColor?: string;
  className?: string;
}

const Squares = ({
  direction = 'right',
  speed = 1,
  borderColor = '#999',
  squareSize = 40,
  hoverFillColor = '#222',
  className = ''
}: SquaresProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | null>(null);
  const numSquaresX = useRef<number>(0);
  const numSquaresY = useRef<number>(0);
  const gridOffset = useRef({ x: 0, y: 0 });
  const hoveredSquare = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      // Set the actual size in memory (scaled to account for extra pixel density)
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      // Scale the drawing context so everything will work at the higher ratio
      ctx.scale(dpr, dpr);
      
      // Set the display size (css pixels)
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      
      numSquaresX.current = Math.ceil(rect.width / squareSize) + 1;
      numSquaresY.current = Math.ceil(rect.height / squareSize) + 1;
    };

    // Use requestAnimationFrame to ensure DOM is ready
    const initCanvas = () => {
      requestAnimationFrame(() => {
        // Add a small delay to ensure container is fully rendered
        setTimeout(() => {
          resizeCanvas();
          // Start animation after canvas is properly sized
          requestRef.current = requestAnimationFrame(updateAnimation);
        }, 10);
      });
    };

    window.addEventListener('resize', resizeCanvas);
    initCanvas();

    const drawGrid = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;

      for (let x = startX; x < rect.width + squareSize; x += squareSize) {
        for (let y = startY; y < rect.height + squareSize; y += squareSize) {
          const squareX = x - (gridOffset.current.x % squareSize);
          const squareY = y - (gridOffset.current.y % squareSize);

          if (
            hoveredSquare.current &&
            Math.floor((x - startX) / squareSize) === hoveredSquare.current.x &&
            Math.floor((y - startY) / squareSize) === hoveredSquare.current.y
          ) {
            ctx.fillStyle = hoverFillColor;
            ctx.fillRect(squareX, squareY, squareSize, squareSize);
          }

          ctx.strokeStyle = borderColor;
          ctx.strokeRect(squareX, squareY, squareSize, squareSize);
        }
      }

      // Create edge fade overlay
      const edgeFadeSize = Math.min(rect.width, rect.height) * 0.5;
      
      // Top fade
      const topGradient = ctx.createLinearGradient(0, 0, 0, edgeFadeSize);
      topGradient.addColorStop(0, '#0c0a12');
      topGradient.addColorStop(1, 'rgba(12, 10, 18, 0)');
      ctx.fillStyle = topGradient;
      ctx.fillRect(0, 0, rect.width, edgeFadeSize);
      
      // Bottom fade
      const bottomGradient = ctx.createLinearGradient(0, rect.height - edgeFadeSize, 0, rect.height);
      bottomGradient.addColorStop(0, 'rgba(12, 10, 18, 0)');
      bottomGradient.addColorStop(1, '#0c0a12');
      ctx.fillStyle = bottomGradient;
      ctx.fillRect(0, rect.height - edgeFadeSize, rect.width, edgeFadeSize);
      
      // Left fade
      const leftGradient = ctx.createLinearGradient(0, 0, edgeFadeSize, 0);
      leftGradient.addColorStop(0, '#0c0a12');
      leftGradient.addColorStop(1, 'rgba(12, 10, 18, 0)');
      ctx.fillStyle = leftGradient;
      ctx.fillRect(0, 0, edgeFadeSize, rect.height);
      
      // Right fade
      const rightGradient = ctx.createLinearGradient(rect.width - edgeFadeSize, 0, rect.width, 0);
      rightGradient.addColorStop(0, 'rgba(12, 10, 18, 0)');
      rightGradient.addColorStop(1, '#0c0a12');
      ctx.fillStyle = rightGradient;
      ctx.fillRect(rect.width - edgeFadeSize, 0, edgeFadeSize, rect.height);
    };

    const updateAnimation = () => {
      const effectiveSpeed = Math.max(speed, 0.1);
      switch (direction) {
        case 'right':
          gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
          break;
        case 'left':
          gridOffset.current.x = (gridOffset.current.x + effectiveSpeed + squareSize) % squareSize;
          break;
        case 'up':
          gridOffset.current.y = (gridOffset.current.y + effectiveSpeed + squareSize) % squareSize;
          break;
        case 'down':
          gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
          break;
        case 'diagonal':
          gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
          gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
          break;
        default:
          break;
      }

      drawGrid();
      requestRef.current = requestAnimationFrame(updateAnimation);
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;

      const hoveredSquareX = Math.floor((mouseX + gridOffset.current.x - startX) / squareSize);
      const hoveredSquareY = Math.floor((mouseY + gridOffset.current.y - startY) / squareSize);

      if (
        !hoveredSquare.current ||
        hoveredSquare.current.x !== hoveredSquareX ||
        hoveredSquare.current.y !== hoveredSquareY
      ) {
        hoveredSquare.current = { x: hoveredSquareX, y: hoveredSquareY };
      }
    };

    const handleMouseLeave = () => {
      hoveredSquare.current = null;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [direction, speed, borderColor, hoverFillColor, squareSize]);

  return <canvas ref={canvasRef} className={`squares-canvas ${className}`}></canvas>;
};

export default Squares;
