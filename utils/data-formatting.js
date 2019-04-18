const formatDates = array => {
  return array.map(({ created_at, ...rest }) => {
    return { created_at: new Date(created_at), ...rest };
  });
};
const renameKey = (object, oldKey, newKey) => {
  const { [oldKey]: currentValue, ...rest } = object;
  return { [newKey]: currentValue, ...rest };
};
const createRef = (array, key, value) => {
  return array.reduce((refObj, element) => {
    refObj[element[key]] = element[value];
    return refObj;
  }, {});
};
const formatData = (array, refObj, oldKey, newKey) => {
  return array.map(object => {
    const newObj = renameKey(object, oldKey, newKey);
    newObj[newKey] = refObj[newObj[newKey]];
    return newObj;
  });
};
const formatComments = (commentsData, titlesAndIds) => {
  let formattedComments = commentsData.map(object => {
    return renameKey(object, "created_by", "author");
  });
  formattedComments = formatData(
    formattedComments,
    titlesAndIds,
    "belongs_to",
    "article_id"
  );
  return formattedComments;
};

module.exports = {
  formatDates,
  renameKey,
  createRef,
  formatData,
  formatComments
};
