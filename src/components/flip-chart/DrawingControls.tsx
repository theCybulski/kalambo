import React, { useCallback, useContext } from 'react';

import { BUTTON_ICON_VARIANTS, ButtonIcon } from 'components/button-icon/ButtonIcon';
import { RoomContext } from 'views/RoomView/RoomContext';

export const DrawingControls = () => {
  const { round: { keyword }, drawingControls, setDrawingControls } = useContext(RoomContext);

  const setToolSize = useCallback((size: number) => {
    setDrawingControls(prevState => ({ ...prevState, strokeWidth: size }));
  }, [setDrawingControls]);

  const setTool = useCallback((tool: string) => {
    setDrawingControls(prevState => ({ ...prevState, mode: tool }));
  }, [setDrawingControls]);

  // const setColor = useCallback((color: string) => {
  //   setDrawingControls(prevState => ({ ...prevState, mode: 'brush' }));
  //   setDrawingControls(prevState => ({ ...prevState, strokeColor: color }));
  // }, [setDrawingControls]);

  const handleClearFlipchart = useCallback(() => {
    setTool('clear');
    setTimeout(() => {
      setTool('brush');
    }, 100);
  }, [setTool]);

  return (
    <div>
      <div>
        Draw: <span data-cy="keyword">{keyword}</span>
      </div>
      <div>
        <div>
          <div>
            <div data-cy="tool-size">Tool size: {drawingControls.strokeWidth}px</div>
            <input
              width="100%"
              type="range"
              defaultValue={drawingControls.strokeWidth}
              min="2"
              max="50"
              onChange={({ target }) => setToolSize(parseInt(target.value, 10))}
              data-cy="input-tool-size"
            />
          </div>

          <ButtonIcon
            variant={BUTTON_ICON_VARIANTS.BRUSH}
            title="Use brush"
            onClick={() => setTool('brush')}
            isActive={drawingControls.mode === 'brush'}
            data-cy="btn-brush"
          >
            Use brush
          </ButtonIcon>

          <ButtonIcon
            variant={BUTTON_ICON_VARIANTS.ERASER}
            title="Use eraser"
            onClick={() => setTool('eraser')}
            isActive={drawingControls.mode === 'eraser'}
            data-cy="btn-eraser"
          >
            Use eraser
          </ButtonIcon>

          <ButtonIcon
            variant={BUTTON_ICON_VARIANTS.CLEAR}
            title="Clear flipchart"
            onClick={handleClearFlipchart}
            data-cy="btn-clear"
          >
            Clear all
          </ButtonIcon>
        </div>
        <div>
          <div>
            {/* <button bgColor="#000" onClick={() => setColor('#000')} />*/}
            {/* <button bgColor="#c80101" onClick={() => setColor('#c80101')} />*/}
            {/* <button bgColor="#09B658" onClick={() => setColor('#09B658')} />*/}
            {/* <button bgColor="#0A78DD" onClick={() => setColor('#0A78DD')} />*/}
            {/* <button bgColor="#5405D4" onClick={() => setColor('#5405D4')} />*/}
            {/* <button bgColor="#F407A4" onClick={() => setColor('#F407A4')} />*/}
            {/* <button bgColor="#FF9900" onClick={() => setColor('#FF9900')} />*/}
            {/* <button bgColor="#FFE600" onClick={() => setColor('#FFE600')} />*/}
          </div>
        </div>
      </div>
    </div>
  );
};
