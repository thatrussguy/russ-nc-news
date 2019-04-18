exports.formatArticles = arrayOfArticles => {
  return arrayOfArticles.map(({ created_at, ...rest }) => {
    return { created_at: new Date(created_at), ...rest };
  });
};
