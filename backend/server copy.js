import express from 'express' 
import cors from 'cors'

import { bugService } from './api/bug/bug.service.js'
import { loggerService } from './services/logger.service.js'

const corsOption = {
  origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
  credentials: true,
}

const app = express() 

app.use(express.static('public'))
app.use(cors(corsOption))
app.use(express.json())

// import { bugRoutes } from './api/bug/bug.routes.js'
// app.use('/api/bug', bugRoutes)
// app.use('/api/bug/save', bugRoutes)

app.get('/api/bug', async (req, res) => {
  try {
    console.log('req.query ', req.query)
    const filterBy = {
      text: req.query.text || '',
      severity: +req.query.severity || 0
    }
    const bugs = await bugService.query(filterBy)
    res.send(bugs)
  } catch (err) {
    res.status(400).send(`Couldn't get bugs`)
  }
})

app.get('/api/bug/:bugId', async (req, res) => {
  const { bugId } = req.params
  try {
    const bug = await bugService.getById(bugId)
    res.send(bug)
  } catch (err) {
    res.status(400).send(`Couldn't get bug`)
  }
}) 

app.post('/api/bug', async (req, res) => {
  const { title, severity } = req.body
  const bugToSave = { title, severity: +severity } 
  try {
    const savedBug = await bugService.save(bugToSave)
    res.send(savedBug)
  } catch (err) {
    res.status(400).send(`Couldn't save bug`)
  }
}) 

app.put('/api/bug', async (req, res) => {
  const { _id, title, severity } = req.body
  const bugToSave = { _id, title, severity: +severity } 
  try {
    const savedBug = await bugService.save(bugToSave)
    res.send(savedBug)
  } catch (err) {
    res.status(400).send(`Couldn't save bug`)
  }
})

// app.put('/api/bug/:bugId', async (req, res) => {
//   const { title, severity } = req.body
//   const { bugId } = req.params
//   const bugToSave = { _id: bugId, title, severity: +severity } 
//   try {
//     const savedBug = await bugService.save(bugToSave)
//     res.send(savedBug)
//   } catch (err) {
//     res.status(400).send(`Couldn't save bug`)
//   }
// })

//delete
app.delete('/api/bug/:bugId', async (req, res) => {
  const { bugId } = req.params
  try {
    await bugService.remove(bugId)
  } catch (err) {
    res.status(400).send(`Couldn't remove bug`)
  }
  res.send('Deleted')
})

const port = 3030
app.listen(port, () => {
  console.log('Server ready at port http://127.0.0.1:3030/')
  loggerService.info('Up and running on port 3030')
})

