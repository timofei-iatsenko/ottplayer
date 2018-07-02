import 'jest-preset-angular';

jest.setTimeout(500);

// Mock mapboxgl.LngLat function
(global as any).mapboxgl = {
  LngLat: (() => function(lng, lat) {
    if (lat || lat === 0) {
      this.lat = lat;
    }
    if (lng || lng === 0) {
      this.lng = lng;
    }
  })(),
};

const mock = () => {
  let storage = {};
  return {
    getItem: (key) => key in storage ? storage[key] : null,
    setItem: (key, value) => storage[key] = value || '',
    removeItem: (key) => delete storage[key],
    clear: () => storage = {},
  };
};

Object.defineProperty(window, 'localStorage', { value: mock() });

// fix material lib browser check
Object.defineProperty(window, 'CSS', { value: () => ({}) });
Object.defineProperty(window, 'matchMedia', { value: () => (
  {
    matches : false,
    addListener: () => { /**/ },
    removeListener: () => { /**/ },
  }
) });

Object.defineProperty(document.body.style, 'transform', {
  value: () =>
    ({
      enumerable: true,
      configurable: true,
    }),
});

Object.defineProperty(window, 'sessionStorage', { value: mock() });
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ['-webkit-appearance'],
});

Object.defineProperty(window, 'requestAnimationFrame', {
  value: (cb) =>
    setTimeout(cb, 0),
});

const WARN_SUPPRESSING_PATTERNS = [
  /Could not find Angular Material core theme/,
  /Could not find HammerJS/,
];

const warn = console.warn;

Object.defineProperty(console, 'warn', {
  value: (...params: string[]) => {
    if (!WARN_SUPPRESSING_PATTERNS.some((pattern) => pattern.test(params[0]))) {
      warn(...params);
    }
  },
});
Object.defineProperty(window, 'URL', { value: { createObjectURL: () => ({}) } });
