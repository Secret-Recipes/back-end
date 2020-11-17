const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require("cookie-parser")
const {restrict} = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const recipeRouter = require('../recipies/recipe-router');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(cookieParser())

server.use('/api/auth', authRouter);
server.use('/api/recipies', recipeRouter);

server.get('/', (req, res) => {
    res.json({message: `it's working!`});
})


module.exports = server;
