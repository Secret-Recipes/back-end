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
	const [id] = await db("users").insert(data, "id")
	return findById(id)
}

async function update(id, data) {
	await db("users").where({ id }).update(data)
	return findById(id)
}

async function findUserRecipies(id) {
	const recipies = await db("recipe as r").where("r.sourceId", id)
		.innerJoin("users as u", "u.id", "r.sourceId")
		.select("r.id", "r.image", "r.title", "u.username as source")

	return recipies;
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
	findUserRecipies
}