const users = [
  {
    id: 1,
    name: 'iu'
  },
  {
    id: 2,
    name: 'rose'
  },
  {
    id: 3,
    name: 'sejeong'
  },
  {
    id: 4,
    name: 'yoona'
  },
  {
    id: 5,
    name: 'maibok❤️'
  }
]


module.exports.setupAllRoutes = (e) => {
  e.get('/', (_req, res) => {
    res.json({ hello: 'world'})
  })

  e.get('/users', (req, res) => {
    if (req.query?.id) {
      res.json({ result: users.filter(user => user.id == req.query.id )})

      return;
    }

    res.json({ result: users})
  })

  e.post('/users', (req, res) => {
    const { name } = req.body
    if (name) {
      users.push({ id: users.length + 1, name})
      res.json({ success: true})

      return
    }


    res.status(422).json({ message: "junior love iu"})
  })

  return e
}
