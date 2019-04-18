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

exports.seed = (knex, Promise) => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      console.log("inserting topics and user data");
      return Promise.all([
        knex("topics")
          .insert(topicsData)
          .returning("*"),
        knex("users")
          .insert(usersData)
          .returning("*")
      ]);
    })
    .then(() => {
      const formattedArticles = formatDates(articlesData);
      console.log("inserting articles data");
      return knex("articles")
        .insert(formattedArticles)
        .returning("*");
    })
    .then(articlesRows => {
      const titlesAndIds = createRef(articlesRows, "title", "article_id");
      const formattedComments = formatComments(commentsData, titlesAndIds);
      console.log("inserting comments data");
      return knex("comments")
        .insert(formattedComments)
        .returning("*");
    });
};
