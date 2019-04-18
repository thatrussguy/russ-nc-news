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
      console.log("inserting topics data");
      return knex("topics")
        .insert(topicsData)
        .returning("*");
    })
    .then(topicsRows => {});
};
