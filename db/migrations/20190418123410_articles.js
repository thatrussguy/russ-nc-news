exports.up = function(knex, Promise) {
  console.log("creating articles table");
  return knex.schema.createTable("articles", articlesTable => {
    articlesTable.increments("article_id").primary();
    articlesTable.string("title");
    articlesTable.string("body");
    articlesTable.integer("votes").defaultTo(0);
    articlesTable.string("topic").notNullable();
    articlesTable
      .foreign("topic")
      .references("slug")
      .inTable("topics");
    articlesTable.string("author").notNullable();
    articlesTable
      .foreign("author")
      .references("username")
      .inTable("users");
    articlesTable.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  console.log("removing articles tables...");
  return knex.schema.dropTable("articles");
};
