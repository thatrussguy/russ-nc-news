const {
  articlesData,
  commentsData,
  topicsData,
  usersData
} = require("../data");
const {
  formatDates,
  createRef,
  formatComments
} = require("../../utils/data-formatting");

exports.seed = (knex, _) => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex("topics").insert(topicsData);
    })
    .then(() => {
      return knex("users").insert(usersData);
    })
    .then(() => {
      const formattedArticles = formatDates(articlesData);
      return knex("articles")
        .insert(formattedArticles)
        .returning("*");
    })
    .then(articlesRows => {
      const titlesAndIds = createRef(articlesRows, "title", "article_id");
      const formattedComments = formatComments(commentsData, titlesAndIds);
      return knex("comments").insert(formattedComments);
    });
};
