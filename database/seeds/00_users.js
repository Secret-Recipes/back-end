// pre-hashed password for "abc12345"
const hashedPassword = "$2a$14$qHqCbXUImiBOgXlFNX47wuA7uFWNGNAZutYLvOeye9eotewGlfYV6"

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        { id: 1, username: "janedoe", email: "jane@yahoo.com", password: hashedPassword },
        { id: 2, username: "johndoe", email: "john@yahoo.com", password: hashedPassword },
      ])
    });
}