import React, { useRef, useState } from 'react';
import './App.css';

function MyComponent() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startCoords, setStartCoords] = useState({ x: 0, y: 0 });
  const [endCoords, setEndCoords] = useState({ x: 0, y: 0 });

  const handleMouseDown = (event) => {
    setIsDrawing(true);
    setStartCoords({ x: event.clientX, y: event.clientY });
    setEndCoords({ x: event.clientX, y: event.clientY });
  };

  const handleMouseMove = (event) => {
    if (!isDrawing) {
      return;
    }
    setEndCoords({ x: event.clientX, y: event.clientY });
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.beginPath();
    ctx.moveTo(startCoords.x, startCoords.y);
    ctx.lineTo(endCoords.x, endCoords.y);
    ctx.stroke();
  };

  const handleMouseUp = (event) => {
    setIsDrawing(false);
  };

  return (
    <div className="App">
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
    </div>
  );
}

export default MyComponent;
