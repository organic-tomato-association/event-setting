export default (obj, prefix) => setPrefix(obj, prefix);

function setPrefix(obj, prefix) {
  const res = {};
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === 'string') {
      res[key] = `${prefix}_${obj[key]}`;
    } else {
      res[key] = setPrefix(obj[key], prefix);
    }
  });
  return res;
}