const db = require("../database/dbConfig")

function find() {
	return db("users")
}

function findById(id) {
	return db("users").where({ id }).first().select("id", "username")
}

function findByUsername(username) {
	return db("users as u")
		.where("u.username", username)
		.first("u.id", "u.username", "u.password")
}

async function create(data) {
	const [id] = await db("users").insert(data)
	return findById(id)
}

async function update(id, data) {
	await db("users").where({ id }).update(data)
	return findById(id)
}

function remove(id) {
	return db("users").where({ id }).del()
}

module.exports = {
	find,
    findById,
    findByUsername,
	create,
	update,
	remove,
}