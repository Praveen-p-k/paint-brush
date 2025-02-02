import { useEffect, useRef, useState } from "react";
import Menu from "./components/Menu";
import "./App.css";

function App() {
  const canvasRef = useRef<any>(null);
  const ctxRef = useRef<any>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lineWidth, setLineWidth] = useState(5);
  const [lineColor, setLineColor] = useState("black");
  const [lineOpacity, setLineOpacity] = useState(0.1);
  const [history, setHistory] = useState<any[]>([]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isEraserActive, setIsEraserActive] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctxRef.current = ctx;

    // Save the initial state of the canvas to history
    const canvasData = canvas.toDataURL();
    setHistory([canvasData]);
    setHistoryIndex(0);
  }, []);

  useEffect(() => {
    ctxRef.current.globalAlpha = lineOpacity;
    ctxRef.current.strokeStyle = lineColor;
    ctxRef.current.lineWidth = lineWidth;
  }, [lineColor, lineOpacity, lineWidth]);

  const saveHistory = () => {
    const canvas = canvasRef.current;
    const canvasData = canvas.toDataURL();
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(canvasData);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const startDrawing = (e: any) => {
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const endDrawing = () => {
    ctxRef.current.closePath();
    setIsDrawing(false);
    saveHistory();
  };

  const draw = (e: any) => {
    if (!isDrawing) {
      return;
    }
    if (isEraserActive) {
      ctxRef.current.globalCompositeOperation = "destination-out";
      ctxRef.current.lineWidth = lineWidth; // Eraser size
    } else {
      ctxRef.current.globalCompositeOperation = "source-over";
      ctxRef.current.strokeStyle = lineColor;
      ctxRef.current.globalAlpha = lineOpacity;
      ctxRef.current.lineWidth = lineWidth;
    }
    ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctxRef.current.stroke();
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      const canvasData = history[newIndex];
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.src = canvasData;
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      };
      setHistoryIndex(newIndex);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      const canvasData = history[newIndex];
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.src = canvasData;
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      };
      setHistoryIndex(newIndex);
    }
  };

  const toggleEraser = () => {
    setIsEraserActive(!isEraserActive);
  };

  return (
    <div className="App">
      <h1>Paint App</h1>
      <div className="draw-area">
        <Menu
          setLineColor={setLineColor}
          setLineWidth={setLineWidth}
          setLineOpacity={setLineOpacity}
          handleUndo={handleUndo}
          handleRedo={handleRedo}
          toggleEraser={toggleEraser}
          isEraserActive={isEraserActive}
        />
        <canvas
          onMouseDown={startDrawing}
          onMouseUp={endDrawing}
          onMouseMove={draw}
          ref={canvasRef}
          width={`1280px`}
          height={`720px`}
        />
      </div>
    </div>
  );
}

export default App;
