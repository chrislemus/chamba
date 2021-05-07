export function updateObjValues(target, src) {
  const res = {};
  Object.keys(target)
        .forEach(k => res[k] = (src.hasOwnProperty(k) ? src[k] : target[k]));
  return res;
}