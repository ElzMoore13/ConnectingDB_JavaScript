
exports.up = function(knex, Promise) {
  return knex.schema.table("milestones", table => {
    table.integer('famous_id');
    table
      .foreign('famous_id')
      .references('id')
      .on('famous_people');

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("milestones", table => {
    table.dropColumn('famousid')
  });
};
