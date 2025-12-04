import React, { useEffect, useState, useRef, useCallback, memo } from 'react';

const CustomArrow = memo(({ startId, endId, color = '#a855f7' }) => {
  const [path, setPath] = useState('');
  const [arrowTip, setArrowTip] = useState({ x: 0, y: 0, angle: 0 });
  const lastPathRef = useRef('');

  const updateArrow = useCallback(() => {
    const startEl = document.getElementById(startId);
    const endEl = document.getElementById(endId);

    if (!startEl || !endEl) {
      return;
    }

    const startRect = startEl.getBoundingClientRect();
    const endRect = endEl.getBoundingClientRect();

    // Start from center-right of pointer box (with slight padding)
    const startX = startRect.right - 8;
    const startY = startRect.top + startRect.height / 2;

    // End at center-left of target (with slight padding)
    const endX = endRect.left + 8;
    const endY = endRect.top + endRect.height / 2;

    // Calculate control points for smooth curve
    const dx = endX - startX;
    const dy = endY - startY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Smoother curve with better control
    const controlX1 = startX + dx * 0.3;
    const controlY1 = startY - distance * 0.15;
    const controlX2 = startX + dx * 0.7;
    const controlY2 = endY - distance * 0.15;

    // Create smooth cubic bezier path
    const pathData = `M ${startX.toFixed(1)} ${startY.toFixed(1)} C ${controlX1.toFixed(1)} ${controlY1.toFixed(1)}, ${controlX2.toFixed(1)} ${controlY2.toFixed(1)}, ${endX.toFixed(1)} ${endY.toFixed(1)}`;
    
    // Only update if path actually changed (prevents excessive re-renders)
    if (pathData !== lastPathRef.current) {
      lastPathRef.current = pathData;
      setPath(pathData);

      // Calculate arrow angle from second control point
      const angle = Math.atan2(endY - controlY2, endX - controlX2) * (180 / Math.PI);
      setArrowTip({ x: endX, y: endY, angle });
    }
  }, [startId, endId]);

  useEffect(() => {
    // Update on mount with slight delay for layout
    const timeoutId = setTimeout(updateArrow, 50);

    // Update on window resize or scroll
    const handleUpdate = () => {
      requestAnimationFrame(updateArrow);
    };

    window.addEventListener('resize', handleUpdate);
    window.addEventListener('scroll', handleUpdate, true);

    // Update less frequently - only every 200ms
    const interval = setInterval(updateArrow, 200);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleUpdate);
      window.removeEventListener('scroll', handleUpdate, true);
      clearInterval(interval);
    };
  }, [updateArrow]);

  if (!path) return null;

  return (
    <svg
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1000
      }}
    >
      {/* Animated dashed path */}
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeDasharray="8 4"
        strokeLinecap="round"
        opacity="0.8"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="0"
          to="24"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </path>

      {/* Arrowhead */}
      <polygon
        points="-8,-4 0,0 -8,4"
        fill={color}
        transform={`translate(${arrowTip.x}, ${arrowTip.y}) rotate(${arrowTip.angle})`}
      />
    </svg>
  );
});

CustomArrow.displayName = 'CustomArrow';

export default CustomArrow;
