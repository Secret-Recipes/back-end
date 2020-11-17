const knex = require('knex');
//const { development } = require('../knexfile');

const knexfile = require('../knexfile');

const env = process.env.NODE_ENV || 'development'

module.exports = knex(knexfile[env]);

//module.exports = knex(knexfile[process.env.NODE_ENV])