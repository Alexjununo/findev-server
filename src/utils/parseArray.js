module.exports = function parseArray(arrayStr) {
  return arrayStr.split(',').map(tech => tech.trim());
};
