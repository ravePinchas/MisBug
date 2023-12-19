import express from 'express' 
import cors from 'cors'
import path from 'path'
import cookieParser from 'cookie-parser'

import { bugService } from './api/bug/bug.service.js'
import { userService } from './api/user/user.service.js'
import { loggerService } from './services/logger.service.js'


const corsOption = {
  origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
  credentials: true,
}

const app = express() 

app.use(express.static('public'))
app.use(cors(corsOption))
app.use(express.json())
app.use(cookieParser())

//Routes
import { bugRoutes } from './api/bug/bug.routes.js'
import { userRoutes } from './api/user/user.routes.js'
import { authRoutes } from './api/auth/auth.routes.js'

app.use('/api/bug', bugRoutes)
app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)

app.get('/**',(req, res) => {
  res.sendFile(path.resolve('public/index.html'))
})

const PORT = process.env.PORT || 3030
app.listen(PORT, () => {
  console.log('Server ready at port http://127.0.0.1:3030/')
  loggerService.info('Up and running on port 3030')
})

// app.get('/api/bug', async (req, res) => {
//   try {
//     console.log('req.query ', req.query)
//     const filterBy = {
//       text: req.query.text || '',
//       severity: +req.query.severity || 0
//     }
//     const bugs = await bugService.query(filterBy)
//     res.send(bugs)
//   } catch (err) {
//     res.status(400).send(`Couldn't get bugs`)
//   }
// })

// app.get('/api/bug/:bugId', async (req, res) => {
//   const { bugId } = req.params
//   try {
//     //cookies
//     let visitBugs = +req.cookies.visitBugs || 0
//     visitBugs++
//     res.cookie('visitBugs', visitBugs, {})
//     if(visitBugs === 3){
//       res.cookie('visitBugs', visitBugs, {maxAge: 1000 * 7, sameSite: 'None', secure: true})
//       throw 'Wait for a bit'
//     }
//     else{
//       res.cookie('visitBugs', visitBugs, {sameSite: 'None', secure: true})
//     }

//     const bug = await bugService.getById(bugId)
//     res.send(bug)
//   } catch (err) {
//     res.status(400).send(`Couldn't get bug`)
//   }
// }) 

// app.post('/api/bug', async (req, res) => {
//   const { title, severity } = req.body
//   const bugToSave = { title, severity: +severity } 
//   try {
//     const savedBug = await bugService.save(bugToSave)
//     res.send(savedBug)
//   } catch (err) {
//     res.status(400).send(`Couldn't save bug`)
//   }
// }) 

// app.put('/api/bug', async (req, res) => {
//   const { _id, title, severity } = req.body
//   const bugToSave = { _id, title, severity: +severity } 
//   try {
//     const savedBug = await bugService.save(bugToSave)
//     res.send(savedBug)
//   } catch (err) {
//     res.status(400).send(`Couldn't save bug`)
//   }
// })

// app.delete('/api/bug/:bugId', async (req, res) => {
//   const { bugId } = req.params
//   try {
//     await bugService.remove(bugId)
//   } catch (err) {
//     res.status(400).send(`Couldn't remove bug`)
//   }
//   res.send('Deleted')
// })


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

// app.get('/api/user', async (req, res) => {
//   try {
//     console.log('req.query ', req.query)
//     const filterBy = {
//       fullname: req.query.fullname || '',
//       username: req.query.username || '',
//       score: +req.query.score || 0
//     }
//     const users = await userService.query(filterBy)
//     res.send(users)
//   } catch (err) {
//     res.status(400).send(`Couldn't get users`)
//   }
// })

// app.get('/api/user/:userId', async (req, res) => {
//   const { userId } = req.params
//   try {
//     const user = await userService.getById(userId)
//     res.send(user)
//   } catch (err) {
//     res.status(400).send(`Couldn't get user`)
//   }
// }) 

// app.post('/api/user', async (req, res) => {
//   const { fullname, username, password, score } = req.body
//   const userToSave = { fullname, username, password, score: +score }
//   try {
//     const saveduser = await userService.save(userToSave)
//     res.send(saveduser)
//   } catch (err) {
//     res.status(400).send(`Couldn't save user`)
//   }
// }) 

// app.put('/api/user', async (req, res) => {
//   const { _id, fullname, username, password, score } = req.body
//   const userToSave = { _id, fullname, username, password, score: +score } 
//   try {
//     const saveduser = await userService.save(userToSave)
//     res.send(saveduser)
//   } catch (err) {
//     res.status(400).send(`Couldn't save user`)
//   }
// })

// app.delete('/api/user/:userId', async (req, res) => {
//   const { userId } = req.params
//   try {
//     await userService.remove(userId)
//   } catch (err) {
//     res.status(400).send(`Couldn't remove user`)
//   }
//   res.send('Deleted')
// })

