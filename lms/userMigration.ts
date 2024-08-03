import { Knex } from "knex";

const TABLE_NAME = "users";

/**
 * Create table users.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex: Knex) {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.specificType("id", "bigint(20) not null primary key auto_increment");
    table.string("firstName").notNullable();
    table.string("lastName").notNullable();
    table.string("email").notNullable().unique();
    table.string("gender").notNullable();
    table.string("middleName");
    table.bigInteger("mobilePhone").notNullable();
    table.string("address");
    table.date("birthday").notNullable();
    table.date("joinDate").notNullable();
    table.string("country").notNullable();
    table.string("timezone").notNullable();
    table.string("workingShift").notNullable();

    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
    table.timestamp("deleted_at");

    table.bigInteger("created_by").references("id").inTable("users");
    table.bigInteger("deleted_by").references("id").inTable("users");
    table.bigInteger("updated_by").references("id").inTable("users");
  });
}

/**
 * Drop table users.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex: Knex) {
  return knex.schema.dropTable(TABLE_NAME);
}
