const SCENES = [
  {
    key: 'racetrack',
    name: 'Racetrack',
    sky: ['#4da8ef', '#8bd0ff'],
    backdrop: '/background/racetrack/01-background.png',
    trackTexture: '/background/racetrack/02-track.png',
    overlayFront: '/background/racetrack/03-crowd-front.png',
    trackTextureSlices: {
      laneSurfaceTop: 0,
      laneSurfaceBottom: 0.74,
      lowerApronTop: 0.69,
    },
    skyRatio: 0.4,
    botRatio: 0.16,
    minBottomPad: 120,
    overlayFrontOffsetY: 34,
    racerYOffset: -54,
    ground: '#5d9827',
    groundDark: '#3d6f19',
    track: '#cf523d',
    laneLine: '#fff7ee',
  },
];

const THEMES = [
  { key: 'day', overlay: 'rgba(255,240,200,0)', star: false },
  { key: 'sunset', overlay: 'rgba(255,120,60,0.18)', sky: ['#f2784b', '#ffd089'], star: false },
  { key: 'night', overlay: 'rgba(20,20,60,0.42)', sky: ['#0a1838', '#243a63'], star: true },
];

export { SCENES, THEMES };
