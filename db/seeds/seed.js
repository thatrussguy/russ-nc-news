const {
  articlesData,
  commentsData,
  topicsData,
  usersData
} = require("../data");
const { formatArticles } = require("../../utils/data-formatting");

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
    .then(([topicsRows, usersRows]) => {
      const formattedArticles = formatArticles(articlesData);
      console.log("inserting articles data");
      return knex("articles")
        .insert(formattedArticles)
        .returning("*");
    })
    .then(articlesRows => console.log(articlesRows));
};
