// lib/tokenRegistry.ts
let _getToken: () => string | null = () => null;
let _setTokenFromOutside: (t: string | null) => void = () => {};

export function registerTokenGetter(fn: () => string | null) {
  _getToken = fn;
}

export function registerTokenSetter(fn: (t: string | null) => void) {
  _setTokenFromOutside = fn;
}

export function getToken() {
  return _getToken();
}

// Dùng cho interceptor sau khi refresh
export function setTokenFromOutside(t: string | null) {
  _setTokenFromOutside(t);
}
