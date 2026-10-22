export function cookies() {
  return Promise.resolve({
    get: () => undefined,
    set: () => {},
    delete: () => {},
    has: () => false,
  });
}
