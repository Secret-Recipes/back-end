module.exports = {
  development: {
    client: 'sqlite3',
    connection: { filename: './database/recipies.db3' },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations',
      tableName: 'dbmigrations',
    },
    seeds: { directory: './database/seeds' },
  },
  testing: {
    client: 'sqlite3',
    connection: { filename: './database/test.db3' },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations',
      tableName: 'dbmigrations',
    },
    seeds: { directory: './database/seeds' },
  },
  production: {
    client: "pg",
    connection: process.env.HEROKU_POSTGRESQL_BLACK_URL,
    migrations: {
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
   
  },
};/*


module.exports = {
  development: {
    client: 'pg',
    connection: process.env.HEROKU_POSTGRESQL_IVORY_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './database/migrations',
      tableName: 'dbmigrations',
    },
    seeds: {
      directory: './database/seeds',
    },
  },  testing: {
    client: 'pg',
    connection: process.env.HEROKU_POSTGRESQL_IVORY_URL,
        pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './database/migrations',
      tableName: 'dbmigrations',
    },
  },
  production: {
    client: "pg",
    connection: process.env.HEROKU_POSTGRESQL_IVORY_URL,
    migrations: {
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
   
  }, 
}
*/