exports.formatDates = array => {
  return array.map(({ created_at, ...rest }) => {
    return { created_at: new Date(created_at), ...rest };
  });
};
exports.renameKey = (object, oldKey, newKey) => {
  const { [oldKey]: currentValue, ...rest } = object;
  return { [newKey]: currentValue, ...rest };
};
exports.createRef = (array, key, value) => {
  return array.reduce((refObj, element) => {
    refObj[element[key]] = element[value];
    return refObj;
  }, {});
};
