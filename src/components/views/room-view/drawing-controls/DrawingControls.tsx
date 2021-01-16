import React, { useCallback, useContext } from 'react';

import { BUTTON_ICON_VARIANTS, ButtonIcon } from 'components/button-icon/ButtonIcon';
import { RoomContext } from 'views/RoomView/RoomContext';

import styles from './DrawingControls.module.scss';
import { ButtonColor } from './components/ButtonColor';

export const DrawingControls = () => {
  const { round: { keyword }, drawingControls, setDrawingControls } = useContext(RoomContext);

  const setToolSize = useCallback((size: number) => {
    setDrawingControls(prevState => ({ ...prevState, strokeWidth: size }));
  }, [setDrawingControls]);

  const setTool = useCallback((tool: string) => {
    setDrawingControls(prevState => ({ ...prevState, mode: tool }));
  }, [setDrawingControls]);

  const setColor = useCallback((color: string) => {
    setDrawingControls(prevState => ({ ...prevState, mode: 'brush' }));
    setDrawingControls(prevState => ({ ...prevState, strokeColor: color }));
  }, [setDrawingControls]);

  const handleClearFlipchart = useCallback(() => {
    setTool('clear');
    setTimeout(() => {
      setTool('brush');
    }, 100);
  }, [setTool]);

  return (
    <>
      <div className={styles.topBar}>
        <div className={styles.keyword}>
          Draw: <span data-cy="keyword">{keyword || 'lorem ipsum dolor sit amet consectetur'}</span>
        </div>

        <div className={styles.tools}>
          <input
            className={styles.sizeInput}
            width="100%"
            type="range"
            defaultValue={drawingControls.strokeWidth}
            min="2"
            max="50"
            onChange={({ target }) => setToolSize(parseInt(target.value, 10))}
            data-cy="input-tool-size"
          />

          <ButtonIcon
            variant={BUTTON_ICON_VARIANTS.BRUSH}
            title="Use brush"
            onClick={() => setTool('brush')}
            isActive={drawingControls.mode === 'brush'}
            data-cy="btn-brush"
            className={styles.btnTool}
          />

          <ButtonIcon
            variant={BUTTON_ICON_VARIANTS.ERASER}
            title="Use eraser"
            onClick={() => setTool('eraser')}
            isActive={drawingControls.mode === 'eraser'}
            data-cy="btn-eraser"
            className={styles.btnTool}
          />

          <ButtonIcon
            variant={BUTTON_ICON_VARIANTS.CLEAR}
            title="Clear flipchart"
            onClick={handleClearFlipchart}
            data-cy="btn-clear"
            className={styles.btnTool}
          />
        </div>
      </div>
      <div className={styles.leftBar}>
        <ButtonColor color="#000" onClick={setColor} currentColor={drawingControls.strokeColor} />
        <ButtonColor color="#c80101" onClick={setColor} currentColor={drawingControls.strokeColor} />
        <ButtonColor color="#09B658" onClick={setColor} currentColor={drawingControls.strokeColor} />
        <ButtonColor color="#0A78DD" onClick={setColor} currentColor={drawingControls.strokeColor} />
        <ButtonColor color="#5405D4" onClick={setColor} currentColor={drawingControls.strokeColor} />
        <ButtonColor color="#F407A4" onClick={setColor} currentColor={drawingControls.strokeColor} />
        <ButtonColor color="#FF9900" onClick={setColor} currentColor={drawingControls.strokeColor} />
        <ButtonColor color="#FFE600" onClick={setColor} currentColor={drawingControls.strokeColor} />
      </div>
    </>
  );
};
