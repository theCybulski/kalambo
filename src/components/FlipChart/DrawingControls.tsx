import React, { useCallback, useContext } from "react";

import ButtonIcon from "components/ButtonIcon/ButtonIcon";
import IconBrush from "assets/icons/IconBrush.svg";
import IconEraser from "assets/icons/IconEraser.svg";
import IconClear from "assets/icons/IconClear.svg";
import { RoomContext } from "views/RoomView/RoomContext";

import * as Styled from "./DrawingControlsStyles";

export const DrawingControls = () => {
  const { round: { keyword }, drawingControls, setDrawingControls } = useContext(RoomContext);

  const setToolSize = useCallback((size: number) => {
    setDrawingControls(prevState => ({ ...prevState, strokeWidth: size }));
  }, [setDrawingControls]);

  const setTool = useCallback((tool: string) => {
    setDrawingControls(prevState => ({ ...prevState, mode: tool }));
  }, [setDrawingControls]);

  const setColor = useCallback((color: string) => {
    setDrawingControls(prevState => ({ ...prevState, mode: "brush" }));
    setDrawingControls(prevState => ({ ...prevState, strokeColor: color }));
  }, [setDrawingControls]);

  const handleClearFlipchart = useCallback(() => {
    setTool("clear");
    setTimeout(() => {
      setTool('brush');
    }, 100)
  }, [setTool]);

  return (
    <Styled.Wrapper>
      <Styled.KeyWordWrapper>
        Draw: <span data-cy="keyword">{keyword}</span>
      </Styled.KeyWordWrapper>
      <Styled.Row>
        <Styled.Column>
          <Styled.InputWrapper>
            <Styled.InputValue data-cy="tool-size">Tool size: {drawingControls.strokeWidth}px</Styled.InputValue>
            <Styled.SInput
              width="100%"
              type="range"
              defaultValue={drawingControls.strokeWidth}
              min="2"
              max="50"
              onChange={({ target }) => setToolSize(target.value)}
              data-cy="input-tool-size"
            />
          </Styled.InputWrapper>

          <ButtonIcon
            icon={IconBrush}
            title="Use brush"
            onClick={() => setTool("brush")}
            isActive={drawingControls.mode === "brush"}
            data-cy="btn-brush"
          >
            Use brush
          </ButtonIcon>

          <ButtonIcon
            icon={IconEraser}
            title="Use eraser"
            onClick={() => setTool("eraser")}
            isActive={drawingControls.mode === "eraser"}
            data-cy="btn-eraser"
          >
            Use eraser
          </ButtonIcon>

          <ButtonIcon
            icon={IconClear}
            title="Clear flipchart"
            onClick={handleClearFlipchart}
            data-cy="btn-clear"
          >
            Clear all
          </ButtonIcon>
        </Styled.Column>
        <Styled.Column>
          <div>
            <Styled.Button bgColor={"#000"} onClick={() => setColor("#000")}/>
            <Styled.Button bgColor={"#c80101"} onClick={() => setColor("#c80101")}/>
            <Styled.Button bgColor={"#09B658"} onClick={() => setColor("#09B658")}/>
            <Styled.Button bgColor={"#0A78DD"} onClick={() => setColor("#0A78DD")}/>
            <Styled.Button bgColor={"#5405D4"} onClick={() => setColor("#5405D4")}/>
            <Styled.Button bgColor={"#F407A4"} onClick={() => setColor("#F407A4")}/>
            <Styled.Button bgColor={"#FF9900"} onClick={() => setColor("#FF9900")}/>
            <Styled.Button bgColor={"#FFE600"} onClick={() => setColor("#FFE600")}/>
          </div>
        </Styled.Column>
      </Styled.Row>
    </Styled.Wrapper>
  );
};
