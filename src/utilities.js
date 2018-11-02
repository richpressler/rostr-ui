export function fetchJSON(url) {
  return fetch(url).then(res => res.json());
}