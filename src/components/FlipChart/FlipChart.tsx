import React, {
  useState,
  useRef,
  useEffect,
  useMemo, useContext, useCallback
} from "react";
import { Image, Layer, Stage } from "react-konva";

import { RoomContext } from "views/RoomView/RoomContext";
import { wsEvents } from "shared/constants";

import * as Styled from "./FlipChartStyles";

export type FlipChartTypes = {};

export const FlipChart = () => {
  const {
    sockets: { room: roomSocket },
    settings,
    localPlayer,
    round: { drawingPlayerId },
    drawingControls: { mode, strokeWidth, strokeColor }
  } = useContext(RoomContext);

  const stageWrapper = useRef(null);
  const stage = useRef(null);
  const { current: currentStage } = stage;
  const layer = useRef(null);
  const { current: currentLayer } = layer;
  const image = useRef(null);
  const { current: currentImage } = image;

  const [flipChartSize, setFlipChartSize] = useState({ width: null, height: null });
  const [preview, setPreview] = useState("");
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPointerPos, setLastPointerPos] = useState({ x: 0, y: 0 });
  const isLocalPlayerDrawing = localPlayer.id === drawingPlayerId;

  const canvas = useMemo(() => {
    const { width, height } = flipChartSize;
    if (width && height) {
      const c = document.createElement("canvas");
      c.width = width;
      c.height = height;

      return c;
    }
  }, [flipChartSize]);

  const ctx = useMemo(() => {
    if (canvas) {
      const context = canvas.getContext("2d");

      context.strokeStyle = strokeColor;
      context.shadowColor = strokeColor;
      context.shadowBlur = 2;
      context.lineJoin = "round";
      context.lineCap = "round";
      context.lineWidth = strokeWidth;
      context.imageSmoothingEnabled = true;

      switch (mode) {
        case "brush":
          context.globalCompositeOperation = "source-over";
          break;
        case "eraser":
          context.globalCompositeOperation = "destination-out";
          break;
      }

      return context;
    }
  }, [canvas, strokeColor, strokeWidth, mode]);

  const clearFlipchart = useCallback(() => {
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      currentLayer.batchDraw();
      roomSocket.emit(wsEvents.toServer.round.flipchart, { data: canvas?.toDataURL(), roomId: settings.roomId });
    }
  }, [ctx, currentLayer, roomSocket, canvas, settings.roomId]);

  useEffect(() => {
    if (isLocalPlayerDrawing) {
      const setSize = () => {
        const { clientWidth, clientHeight } = stageWrapper.current;

        setFlipChartSize({
          width: clientWidth,
          height: clientHeight
        });
      };

      setSize();
      window.addEventListener("resize", setSize);

      return () => window.removeEventListener("resize", setSize);
    }
  }, [isLocalPlayerDrawing]);

  useEffect(() => {
    if (!isDrawing) {
      roomSocket.on(wsEvents.toClient.round.flipchart, (data) => {
        console.log("setting data");
        setPreview(data);
      });

      // return () => roomSocket.removeAllListeners();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDrawing]);

  useEffect(() => {
    if (isLocalPlayerDrawing) {
      roomSocket.emit(wsEvents.toServer.round.flipchart, { data: canvas?.toDataURL(), roomId: settings.roomId });

      const interval = setInterval(() => {
        if (isDrawing) {
          console.log("emitting...");
          roomSocket.emit(wsEvents.toServer.round.flipchart, { data: canvas?.toDataURL(), roomId: settings.roomId });
        }
      }, 300);

      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvas, isLocalPlayerDrawing, isDrawing]);

  useEffect(() => {
    if (mode === "clear") {
      clearFlipchart();
    }
  }, [mode, clearFlipchart]);

  const drawDot = useCallback(() => {
    const pos = currentStage.getPointerPosition();
    ctx.beginPath();
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    ctx.closePath();
    currentLayer.batchDraw();
  }, [currentLayer, ctx, currentStage]);

  const drawLine = useCallback(() => {
    const pos = currentStage.getPointerPosition();

    ctx.beginPath();
    const localPos = {
      x: lastPointerPos.x - currentImage.x(),
      y: lastPointerPos.y - currentImage.y()
    };
    ctx.moveTo(localPos.x, localPos.y);

    localPos.x = pos.x - currentImage.x();
    localPos.y = pos.y - currentImage.y();
    ctx.lineTo(localPos.x, localPos.y);
    ctx.stroke();
    ctx.closePath();
    setLastPointerPos(pos);

    currentLayer.batchDraw();
  }, [ctx, currentLayer, lastPointerPos, currentStage, currentImage]);

  const handleBrushDown = useCallback(() => {
    setIsDrawing(true);
    setLastPointerPos(stage.current.getPointerPosition());

    drawDot();
  }, [setIsDrawing, setLastPointerPos, drawDot]);

  const handleBrushUp = useCallback(() => {
    setIsDrawing(false);
  }, [setIsDrawing]);

  const handleDrawing = useCallback(() => {
    if (ctx && isDrawing) {
      drawLine();
    }
  }, [ctx, isDrawing, drawLine]);

  return (
    isLocalPlayerDrawing ? (
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
    ) : (
      preview && (
        <Styled.PreviewWrapper>
          <Styled.Preview src={preview} alt="preview"/>
        </Styled.PreviewWrapper>
      )
    )
  );
};

