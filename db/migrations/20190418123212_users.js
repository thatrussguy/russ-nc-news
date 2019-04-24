exports.up = function(knex, _) {
  return knex.schema.createTable("users", usersTable => {
    usersTable.string("username").primary();
    usersTable.string("avatar_url").notNullable();
    usersTable.string("name").notNullable();
  });
};

exports.down = function(knex, _) {
  return knex.schema.dropTable("users");
};
