import { bugService } from "./bug.service.js"

export async function getBugs(req, res) {
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
}

export async function addBug (req, res) {
  const { title, severity } = req.body

  const bugToSave = { title, severity: +severity } 

  try {
    const savedBug = await bugService.save(bugToSave, req.loggedinUser)
    res.send(savedBug)
  } catch (err) {
    res.status(400).send(`Couldn't save bug`)
  }
}

export async function getBugId (req, res) {
  const { bugId } = req.params
  try {
    const bug = await bugService.getById(bugId)
    res.send(bug)
  } catch (err) {
    res.status(400).send(`Couldn't get bug`)
  }
}

export async function saveBug (req, res) {
  const { _id, title, severity } = req.body
  const bugToSave = { _id, title, severity: +severity } 

  try {
    const savedBug = await bugService.save(bugToSave, req.loggedinUser)
    res.send(savedBug)
  } catch (err) {
    res.status(400).send(`Couldn't save bug`)
  }
}

export async function removeBug (req, res) {
  const { bugId } = req.params

  console.log('req.loggedinUser', req.loggedinUser);

  try {
    await bugService.remove(bugId, req.loggedinUser)
    res.send('Deleted')
  } catch (err) {
    res.status(400).send(`Couldn't remove bug`)
  }

}