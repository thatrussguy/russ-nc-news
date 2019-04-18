exports.up = function(knex, Promise) {
  console.log("creating comments table");
  return knex.schema.createTable("comments", commentsTable => {
    commentsTable.increments("comment_id").primary();
    commentsTable.string("body").notNullable();
    commentsTable.integer("votes").defaultTo(0);
    commentsTable
      .integer("article_id")
      .references("article_id")
      .inTable("articles");
    commentsTable
      .string("author")
      .references("username")
      .inTable("users");
    commentsTable.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  console.log("removing comments tables...");
  return knex.schema.dropTable("comments");
};
