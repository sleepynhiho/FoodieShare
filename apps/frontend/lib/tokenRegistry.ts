let _getToken: () => string | null = () => null;

export function registerTokenGetter(fn: () => string | null) {
  _getToken = fn;
}

export function getToken() {
  return _getToken();
}
