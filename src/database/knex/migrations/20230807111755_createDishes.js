
exports.up = knex => knex.schema.createTable("dishes", table => {
    table.increments("id");
    table.text("title").notNullable();
    table.text("description").notNullable();
    table.text("categoty").notNullable();
    table.real("price", 10, 2).notNullable();
    table.varchar("imgdish");
    table.integer("user_id").references("id").inTable("users");

    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
});


exports.down = knex => knex.schema.dropTable("dishes");