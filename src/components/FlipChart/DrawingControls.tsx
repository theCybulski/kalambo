import React from 'react';
import { observer } from 'mobx-react';
import { useStores } from 'hooks/useStores';

import ButtonIcon from 'components/ButtonIcon/ButtonIcon';
import ColorPicker from 'components/ColorPicker/ColorPicker';

import IconBrush from 'assets/icons/IconBrush.svg';
import IconEraser from 'assets/icons/IconEraser.svg';
import IconClear from 'assets/icons/IconClear.svg';

import * as Styled from './DrawingControlsStyles';

const DrawingControls = observer(({ onClear }) => {
  const {
    rootStore: {
      drawingControls: {
        mode,
        strokeWidth,
        strokeColor,
        strokeColor: {
          a,
          hex,
          rgb,
          hsvl: { h, s, v, l },
        },
      },
      setTool,
      setToolSize,
      setStrokeColor,
    },
  } = useStores();

  const handleChangeComplete = (color) => {
    const {
      hex,
      rgb: { r, g, b },
      hsv: { h, s, v },
      hsl: { l },
      source,
    } = color;

    const isSaturation = source === 'hsv';

    setStrokeColor({
      a: strokeColor.a,
      hex,
      rgb: { r, g, b },
      hsvl: {
        h: isSaturation ? strokeColor.hsvl.h : h,
        s: isSaturation ? s : strokeColor.hsvl.s,
        v,
        l: isSaturation ? l : strokeColor.hsvl.l,
      },
    });
  };

  return (
    <Styled.Wrapper>
      <Styled.KeyWordWrapper>Draw: Kobra</Styled.KeyWordWrapper>
      <Styled.Row>
        <Styled.Column>
          <Styled.InputWrapper>
            <Styled.InputValue>Tool size: {strokeWidth}px</Styled.InputValue>
            <Styled.SInput
              width="100%"
              type="range"
              defaultValue={strokeWidth}
              min="2"
              max="50"
              onChange={({ target }) => setToolSize(target.value)}
            />
          </Styled.InputWrapper>

          <ButtonIcon
            icon={IconBrush}
            title="Use brush"
            onClick={() => setTool('brush')}
            isActive={mode === 'brush'}
          >
            Use brush
          </ButtonIcon>

          <ButtonIcon
            icon={IconEraser}
            title="Use eraser"
            onClick={() => setTool('eraser')}
            isActive={mode === 'eraser'}
          >
            Use eraser
          </ButtonIcon>

          <ButtonIcon icon={IconClear} title="Clear flipchart" onClick={onClear}>
            Clear all
          </ButtonIcon>
        </Styled.Column>
        <Styled.Column>
          <ColorPicker
            hex={hex}
            rgb={rgb}
            hsvl={{ h, s, v, l }}
            a={a}
            onChange={handleChangeComplete}
          />
        </Styled.Column>
      </Styled.Row>
    </Styled.Wrapper>
  );
});

export default DrawingControls;
