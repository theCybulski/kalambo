import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useMemo,
} from 'react';
import { Image, Layer, Stage } from 'react-konva';

import { useStores } from 'hooks/useStores';

import * as Styled from './FlipChartStyles';

export type FlipChartTypes = {
  ref: any;
};

const FlipChart: React.FC<FlipChartTypes> = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    clearAll() {
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        currentLayer.batchDraw();
        handleSetPreview();
      }
    },
  }));

  const {
    rootStore: {
      drawingControls: { mode, strokeWidth, strokeColor },
    },
  } = useStores();

  const stageWrapper = useRef(null);

  const stage = useRef(null);
  const { current: currentStage } = stage;

  const layer = useRef(null);
  const { current: currentLayer } = layer;

  const image = useRef(null);
  const { current: currentImage } = image;

  const [flipChartSize, setFlipChartSize] = useState({ width: null, height: null });
  const [preview, setPreview] = useState('');
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPointerPos, setLastPointerPos] = useState({ x: 0, y: 0 });
  const [previewInterval, setPreviewInterval] = useState(null);

  const canvas = useMemo(() => {
    const { width, height } = flipChartSize;
    if (width && height) {
      const c = document.createElement('canvas');
      c.width = width;
      c.height = height;

      return c;
    }
  }, [flipChartSize]);

  const ctx = useMemo(() => {
    if (canvas) {
      const context = canvas.getContext('2d');
      const {
        a,
        rgb: { r, g, b },
      } = strokeColor;

      context.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
      context.shadowColor = strokeColor;
      context.shadowBlur = 2;
      context.lineJoin = 'round';
      context.lineCap = 'round';
      context.lineWidth = strokeWidth;
      context.imageSmoothingEnabled = true;

      switch (mode) {
        case 'brush':
          context.globalCompositeOperation = 'source-over';
          break;
        case 'eraser':
          context.globalCompositeOperation = 'destination-out';
          break;
      }

      return context;
    }
  }, [canvas, strokeColor, strokeWidth, mode]);

  useEffect(() => {
    const setSize = () => {
      const { clientWidth, clientHeight } = stageWrapper.current;

      setFlipChartSize({
        width: clientWidth,
        height: clientHeight,
      });
    };

    setSize();
    window.addEventListener('resize', setSize);

    return () => window.removeEventListener('resize', setSize);
  }, []);

  const handleSetPreview = () => {
    console.log('emitting...');
    setPreview(canvas.toDataURL());
  };

  const handleBrushDown = () => {
    console.log('brush down');

    setIsDrawing(true);
    setLastPointerPos(stage.current.getPointerPosition());

    drawDot();

    !previewInterval && setPreviewInterval(setInterval(handleSetPreview, 500));
  };

  const drawDot = () => {
    const pos = currentStage.getPointerPosition();
    ctx.beginPath();
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    ctx.closePath();
    currentLayer.batchDraw();
  };

  const drawLine = () => {
    const pos = currentStage.getPointerPosition();

    ctx.beginPath();
    const localPos = {
      x: lastPointerPos.x - currentImage.x(),
      y: lastPointerPos.y - currentImage.y(),
    };
    ctx.moveTo(localPos.x, localPos.y);

    localPos.x = pos.x - currentImage.x();
    localPos.y = pos.y - currentImage.y();
    ctx.lineTo(localPos.x, localPos.y);
    ctx.stroke();
    ctx.closePath();
    setLastPointerPos(pos);

    currentLayer.batchDraw();
  };

  const handleBrushUp = () => {
    console.log('brush up');

    setIsDrawing(false);
    clearInterval(previewInterval);
    setPreviewInterval(null);
    handleSetPreview();
  };

  const handleDrawing = () => {
    if (ctx && isDrawing) {
      console.log('drawing');
      drawLine();
    }
  };

  return (
    <>
      {preview && (
        <Styled.PreviewWrapper>
          <Styled.Preview src={preview} alt="preview" />
        </Styled.PreviewWrapper>
      )}
      <Styled.StageWrapper ref={stageWrapper}>
        <Stage ref={stage} width={flipChartSize.width} height={flipChartSize.height}>
          <Layer ref={layer}>
            <Image
              image={canvas}
              ref={image}
              onMouseDown={handleBrushDown}
              onTouchStart={handleBrushDown}
              onMouseUp={handleBrushUp}
              onTouchEnd={handleBrushUp}
              onMouseMove={handleDrawing}
              onTouchMove={handleDrawing}
              onMouseLeave={handleBrushUp}
            />
          </Layer>
        </Stage>
      </Styled.StageWrapper>
    </>
  );
});

export default FlipChart;
