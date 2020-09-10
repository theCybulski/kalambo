import { RootStore, IRootStore } from './RootStore';

describe('RootStore', () => {
  let store: IRootStore;

  beforeEach(() => {
    store = new RootStore();
  });

  it('Initiates with default values', () => {
    expect(store.drawingControls.mode).toBe('brush');
    expect(store.drawingControls.strokeWidth).toBe(5);
    expect(store.drawingControls.strokeColor.hex).toBe('#711fda');
    expect(store.drawingControls.strokeColor.a).toBe(1);
    expect(store.drawingControls.strokeColor.rgb.r).toBe(113);
    expect(store.drawingControls.strokeColor.rgb.g).toBe(31);
    expect(store.drawingControls.strokeColor.rgb.b).toBe(218);
    expect(store.drawingControls.strokeColor.hsvl.h).toBe(266);
    expect(store.drawingControls.strokeColor.hsvl.s).toBe(75);
    expect(store.drawingControls.strokeColor.hsvl.v).toBe(0.8510);
    expect(store.drawingControls.strokeColor.hsvl.l).toBe(49);
  })

  it('Sets tool', () => {
    expect(store.drawingControls.mode).toBe('brush');

    store.setTool('eraser');

    expect(store.drawingControls.mode).toBe('eraser');
  });

  it('Sets tool size', () => {
    expect(store.drawingControls.strokeWidth).toBe(5);

    store.setToolSize(27);

    expect(store.drawingControls.strokeWidth).toBe(27);
  });

  it('Sets stroke color', () => {
    expect(JSON.stringify(store.drawingControls.strokeColor)).toBe(
      JSON.stringify({
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
          v: 0.851,
          l: 49,
        },
      })
    );

    store.setStrokeColor({
      hex: '#0276fa',
      a: 1,
      rgb: {
        r: 2,
        g: 118,
        b: 250,
      },
      hsvl: {
        h: 212,
        s: 99,
        v: 0.98,
        l: 49,
      },
    });

    expect(JSON.stringify(store.drawingControls.strokeColor)).toBe(
      JSON.stringify({
        hex: '#0276fa',
        a: 1,
        rgb: {
          r: 2,
          g: 118,
          b: 250,
        },
        hsvl: {
          h: 212,
          s: 99,
          v: 0.98,
          l: 49,
        },
      })
    );
  });
});
