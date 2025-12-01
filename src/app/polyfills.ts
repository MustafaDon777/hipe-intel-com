// src/app/polyfills.ts
if (typeof window === 'undefined') {
  // Mock localStorage for server-side
  global.localStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
    key: () => null,
    length: 0,
  } as Storage;
}