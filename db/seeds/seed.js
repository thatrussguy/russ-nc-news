const {
  articlesData,
  commentsData,
  topicsData,
  usersData
} = require("../data");

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
      // format articles
      console.log("inserting articles data");
      return knex("articles")
        .insert(articlesData)
        .returning("*");
    })
    .then(articlesRows => console.log(articlesRows));
};
