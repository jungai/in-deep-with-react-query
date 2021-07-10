const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const { setupAllRoutes } = require('./routes')
const e = require('express')

function setupCors(e) {
   return e.use(cors())
}

function setupMorgan(e) {
  return e.use(morgan('tiny'))
}

function setupRoutes(e) {
  return setupAllRoutes(e)
}

const app = [setupCors, setupMorgan, setupRoutes].reduce((e, middleware) => middleware(e) , express())

module.exports = { app }

