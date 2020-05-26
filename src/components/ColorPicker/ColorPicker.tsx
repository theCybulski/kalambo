import React from 'react';
import { CustomPicker } from 'react-color';
import { Hue, Saturation } from 'react-color/lib/components/common';

import * as Styled from './ColorPickerStyles';

export type ColorPickerProps = {
  rgb: {
    r: number;
    g: number;
    b: number;
  };
  hsvl: {
    h: number;
    s: number;
    v: number;
    l: number;
  };
  a: number;
  hex: string;
  onChange: (color: any) => void;
};

const ColorPicker: React.FC<ColorPickerProps> = CustomPicker(({ rgb, hsvl, a, hex, onChange }) => {
  const { h, s, v, l } = hsvl;

  return (
    <Styled.Wrapper>
      <Styled.SaturationWrapper>
        <Saturation
          pointer={Styled.SaturationPointer}
          onChange={onChange}
          hex={hex}
          hsl={{ h, s, l }}
          hsv={{ h, s, v }}
          rgb={{ ...rgb, a }}
        />
      </Styled.SaturationWrapper>
      <Styled.HueWrapper>
        <Hue
          pointer={Styled.HuePointer}
          onChange={onChange}
          hex={hex}
          hsl={{ h, s, l }}
          hsv={{ h, s, v }}
          rgb={{ ...rgb, a }}
        />
      </Styled.HueWrapper>
    </Styled.Wrapper>
  );
});

export default ColorPicker;
