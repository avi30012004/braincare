import React, { useRef, useEffect, useState } from 'react';

const DigitalDoodlePad = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState('brush'); // 'brush' or 'eraser'
  const [color, setColor] = useState('#FFFFFF'); // Default white color
  const [lineThickness, setLineThickness] = useState(5);
  const [lastPoint, setLastPoint] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Set initial canvas properties
    context.lineWidth = 5;
    context.lineCap = 'round'; // Round line caps for smoother drawing

    // Function to get canvas image data
    const getCanvasImage = () => canvas.toDataURL();

    // Function to load image data onto canvas
    const loadCanvasImage = (data) => {
      const img = new Image();
      img.onload = () => context.drawImage(img, 0, 0);
      img.src = data;
    };

    // Handle drawing start
    const handleMouseDown = (e) => {
      setIsDrawing(true);
      const rect = canvas.getBoundingClientRect();
      setLastPoint({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      context.strokeStyle = tool === 'brush' ? color : '#000000'; // Use background color for eraser (assuming black background)
      context.globalCompositeOperation = tool === 'brush' ? 'source-over' : 'destination-out'; // Set composite operation for eraser
      context.lineWidth = lineThickness; // Set current line thickness

      // Save initial state to history
    };

    // Handle drawing in progress
    const handleMouseMove = (e) => {
      if (!isDrawing) return;
      const rect = canvas.getBoundingClientRect();
      const currentPoint = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };

      if (lastPoint) {
        context.beginPath();
        context.moveTo(lastPoint.x, lastPoint.y);
        context.lineTo(currentPoint.x, currentPoint.y);
        context.stroke();
        setLastPoint(currentPoint);
      }
    };

    // Handle drawing end and save state to history
    const handleMouseUp = () => {
      setIsDrawing(false);
      setLastPoint(null);
      // Save current state to history
      const currentState = getCanvasImage();
      const newHistory = history.slice(0, historyIndex + 1);
      setHistory([...newHistory, currentState]);
      setHistoryIndex(newHistory.length);
    };

    // Restore canvas from history
    if (historyIndex > -1 && history[historyIndex]) {
      loadCanvasImage(history[historyIndex]);
    }

    // Initial save to history after canvas is ready

    // Add event listeners
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseout', handleMouseUp); // Stop drawing if mouse leaves canvas

    // Clean up event listeners
    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseout', handleMouseUp);
    };
  }, [isDrawing, lastPoint]);

  // Effect to handle tool, color, and thickness changes
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.strokeStyle = tool === 'brush' ? color : '#000000'; // Assuming black background for eraser
    context.globalCompositeOperation = tool === 'brush' ? 'source-over' : 'destination-out';
    context.lineWidth = lineThickness;
  }, [tool, color, lineThickness]);

  // Effect to save initial canvas state to history
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const initialState = canvas.toDataURL();
      setHistory([initialState]);
      setHistoryIndex(0);
    }
  }, []); // Run only once on mount

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    // Save cleared state to history
    const clearedState = canvas.toDataURL();
    const newHistory = history.slice(0, historyIndex + 1);
    setHistory([...newHistory, clearedState]);
    setHistoryIndex(newHistory.length);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
    }
  };

  const downloadDrawing = () => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    const link = document.createElement('a');
    link.download = 'my-doodle.png';
    link.href = image;
    link.click();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-n-8 text-n-1 p-4">
      <h2 className="text-3xl font-bold mb-4 font-code">Digital Doodle Pad</h2>

      {/* Drawing Controls */}
      <div className="mb-4 space-x-4 flex items-center">
        {/* Tool Selection */}
        <label className="font-code">Tool:</label>
        <select value={tool} onChange={(e) => setTool(e.target.value)} className="px-2 py-1 rounded bg-n-7 text-n-1">
          <option value="brush">Brush</option>
          <option value="eraser">Eraser</option>
        </select>

        {/* Color Picker */}
        <label htmlFor="colorPicker" className="font-code">Color:</label>
        <input id="colorPicker" type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-8 h-8 p-0 border-none rounded overflow-hidden cursor-pointer" />

        {/* Line Thickness */}
        <label htmlFor="thicknessSlider" className="font-code">Thickness:</label>
        <input id="thicknessSlider" type="range" min="1" max="20" value={lineThickness} onChange={(e) => setLineThickness(parseInt(e.target.value))} className="w-32 h-4 bg-n-7 rounded-lg appearance-none cursor-pointer accent-purple-500" />
        <span>{lineThickness}</span>

        {/* Clear Button */}
        <button onClick={clearCanvas} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 font-code">Clear</button>

        {/* Undo/Redo */}
        <button onClick={undo} disabled={historyIndex <= 0} className="px-4 py-2 bg-purple-600 text-white rounded disabled:opacity-50 hover:bg-purple-700 font-code">Undo</button>
        <button onClick={redo} disabled={historyIndex >= history.length - 1} className="px-4 py-2 bg-purple-600 text-white rounded disabled:opacity-50 hover:bg-purple-700 font-code">Redo</button>

        {/* Save Button */}
        <button onClick={downloadDrawing} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-code">Save</button>

        {/* Background Color */}
         <label htmlFor="bgColorPicker" className="font-code">Background:</label>
         <input id="bgColorPicker" type="color" value="#1a1a2e" onChange={(e) => {
             const canvas = canvasRef.current;
             const context = canvas.getContext('2d');
             const prevGlobalCompositeOperation = context.globalCompositeOperation;
             context.globalCompositeOperation = 'destination-over';
             context.fillStyle = e.target.value;
             context.fillRect(0, 0, canvas.width, canvas.height);
             context.globalCompositeOperation = prevGlobalCompositeOperation;

             // Save background change to history
             const currentState = canvas.toDataURL();
             const newHistory = history.slice(0, historyIndex + 1);
             setHistory([...newHistory, currentState]);
             setHistoryIndex(newHistory.length);
         }} className="w-8 h-8 p-0 border-none rounded overflow-hidden cursor-pointer" />
      </div>

      <canvas
        ref={canvasRef}
        width={800} // Set a default width, you might want to make this responsive
        height={600} // Set a default height, you might want to make this responsive
        className="border border-n-1/50 rounded-lg"
        style={{ backgroundColor: color === '#000000' ? '#000001' : '#000000' }} // Use a slightly different color if black is chosen for drawing
      >
        Your browser does not support the HTML canvas tag.
      </canvas>
      {/* Add drawing controls here later (e.g., color picker, clear button) */}
    </div>
  );
};

export default DigitalDoodlePad;