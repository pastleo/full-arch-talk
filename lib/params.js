(() => {
  let _params = {};
  window.location.hash
    .substring(1)
    .split("/")
    .map(
      pair => pair.split("=")
    ).forEach(pair => {
      _params[pair[0]] = pair[1] || true;
    });
  Object.defineProperty(window, 'params', {
    get: () => _params,
    set: (newParams) => {
      _params = { ..._params, ...newParams }
      window.location.hash = Object.keys(_params).map(
        key => [key, _params[key]]
      ).map(
        pair => (typeof(pair[1]) === "boolean" && pair[1] ? pair[0] : `${pair[0]}=${pair[1]}`)
      ).join('/');
    },
    enumerable: true,
    configurable: true
  });
})();
