module.exports.setupAllRoutes = (e) => {
  e.get('/', (_req, res) => {
    res.json({ hello: 'world'})
  })

  return e
}
