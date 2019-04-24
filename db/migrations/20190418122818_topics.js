exports.up = function(knex, _) {
  return knex.schema.createTable("topics", topicsTable => {
    topicsTable.string("slug").primary();
    topicsTable.string("description").notNullable();
  });
};

exports.down = function(knex, _) {
  return knex.schema.dropTable("topics");
};
