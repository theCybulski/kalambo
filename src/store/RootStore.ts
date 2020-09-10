import { observable, action } from 'mobx';

export interface IRootStore {
  drawingControls: {
    mode: string;
    strokeWidth: number;
    strokeColor: {
      hex: string;
      a: number;
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
    };
  };
  setTool: (tool: string) => void;
  setToolSize: (size: number) => void;
  setStrokeColor: (color: IRootStore['drawingControls']['strokeColor']) => void;
}

export class RootStore implements IRootStore {
  @observable drawingControls = {
    mode: 'brush',
    strokeWidth: 5,
    strokeColor: {
      hex: '#711fda',
      a: 1,
      rgb: {
        r: 113,
        g: 31,
        b: 218,
      },
      hsvl: {
        h: 266,
        s: 75,
        v: 0.8510,
        l: 49,
      },
    },
  };

  @action setTool = (tool) => {
    this.drawingControls.mode = tool;
  };

  @action setToolSize = (size) => {
    this.drawingControls.strokeWidth = size;
  };

  @action setStrokeColor = (color) => {
    this.drawingControls.strokeColor = color;
  };
}
