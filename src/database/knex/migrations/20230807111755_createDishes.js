
exports.up = knex => knex.schema.createTable("dishes", table => {
    table.increments("id");
    table.text("title");
    table.text("description");
    table.text("categoty");
    table.real("price");
    table.text("dish");
    table.integer("user_id").references("id").inTable("users");

    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
});


exports.down = knex => knex.schema.dropTable("dishes");