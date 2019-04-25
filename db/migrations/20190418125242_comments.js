exports.up = function(knex, _) {
  return knex.schema.createTable("comments", commentsTable => {
    commentsTable.increments("comment_id").primary();
    commentsTable.text("body").notNullable();
    commentsTable.integer("votes").defaultTo(0);
    commentsTable
      .integer("article_id")
      .references("article_id")
      .inTable("articles")
      .onDelete("CASCADE");
    commentsTable
      .string("author")
      .references("username")
      .inTable("users")
      .notNullable();
    commentsTable.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, _) {
  return knex.schema.dropTable("comments");
};
