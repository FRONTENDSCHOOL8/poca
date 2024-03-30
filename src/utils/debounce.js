export default function debounce(callback, timeout = 400) {
  let cleanup;
  return (...args) => {
    clearTimeout(cleanup);
    cleanup = setTimeout(callback.bind(null, ...args), timeout);
  };
}
