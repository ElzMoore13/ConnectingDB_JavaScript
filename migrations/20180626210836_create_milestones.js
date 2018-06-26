
exports.up = function(knex, Promise) {
  return knex.schema.createTable("milestones", table => {
    table.increments('id').primary(),
    table.string('description');
    table.date('birthdate');

  });

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('milestones')
};
