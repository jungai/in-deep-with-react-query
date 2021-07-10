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

function setupParser(e) {
  return e.use(express.json()).use(express.urlencoded({
    extended: true
  }))
}

const app = [setupCors, setupParser, setupMorgan, setupRoutes].reduce((e, middleware) => middleware(e) , express())

module.exports = { app }

