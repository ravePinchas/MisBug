import { utilService } from '../../services/util.service.js'
import { loggerService } from '../../services/logger.service.js'

export const bugService = {
  query,
  getById,
  remove, 
  save
}

var bugs = utilService.readJsonFile('./data/bug.json')

async function query(filterBy = {}) {
  try {
    let bugsToReturn = [...bugs]
    if(filterBy.text) {
      bugsToReturn = bugsToReturn.filter((bug)=>
      bug.title.toLowerCase().includes(filterBy.text.toLowerCase()))
    }

    if(filterBy.severity){
      bugsToReturn = bugsToReturn.filter((bug)=> bug.severity === filterBy.severity)
    }
    return bugsToReturn
  } catch (err) {
    loggerService.error(err)
    throw (err)
  }
 
}
async function getById(bugId) {
  try {
    var bug = bugs.find(bug => bug._id === bugId)
    if(!bug) throw `Couldn't find bug with _id ${bugId}`
    return bug
  } catch (err) {
    loggerService.error(err)
    throw (err)
  }

}
async function remove(bugId, loggedinUser) {
  try {
    const idx = bugs.findIndex(bug => bug._id === bugId)
    if(idx === -1) throw `Couldn't find bug with _id ${bugId}`

    const bug = bugs[idx]
    if(!loggedinUser.isAdmin &&  bug.owner._id !== loggedinUser._id) throw 'Not yor bug!'


    bugs.splice(idx, 1)

    utilService.saveBugToFile('./data/bug.json', bugs)
  
  } catch (err) {
    loggerService.error(err)
    throw (err)
  }

}
async function save(bugToSave, loggedinUser) {
  try {
    if(bugToSave._id){
      var idx = bugs.findIndex(bug => bug._id === bugToSave._id)
      if(idx === -1) throw `Couldn't find bug with _id ${bugToSave._id}`

      const bug = bugs[idx]
      if(!loggedinUser.isAdmin && bugToSave.owner._id !== loggedinUser._id) throw 'Not your bug'

      bugs.splice(idx, 1, {...bug, ...bugToSave})
    }
    else{
      bugToSave._id = utilService.makeId()
      bugToSave.createdAt = Date.now()
      bugToSave.owner = loggedinUser
      bugs.push(bugToSave)
    }
    utilService.saveBugToFile('./data/bug.json', bugs)
    return(bugToSave)
  } catch (err) {
    loggerService.error(err)
    throw (err)
  }
}

