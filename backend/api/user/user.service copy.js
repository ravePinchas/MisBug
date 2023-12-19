import { utilService } from '../../services/util.service.js'
import { loggerService } from '../../services/logger.service.js'

export const userService = {
  query,
  getById,
  remove, 
  save
}

var users = utilService.readJsonFile('./data/user.json')

async function query(filterBy = {}) {
  try {
    let usersToReturn = [...users]
    if(filterBy.fullname) {
      usersToReturn = usersToReturn.filter((user)=>
      user.fullname.toLowerCase().includes(filterBy.fullname.toLowerCase()))
    }

    if(filterBy.username) {
      usersToReturn = usersToReturn.filter((user)=>
      user.username.toLowerCase().includes(filterBy.username.toLowerCase()))
    }

    if(filterBy.score){
      usersToReturn = usersToReturn.filter((user)=> user.score === filterBy.score)
    }
    return users
  } catch (err) {
    loggerService.error(err)
    throw (err)
  }
 
}
async function getById(userId) {
  try {
    var user = users.find(user => user._id === userId)
    if(!user) throw `Couldn't find user with _id ${userId}`
    return user
  } catch (err) {
    loggerService.error(err)
    throw (err)
  }

}
async function remove(userId) {
  try {
    const idx = users.findIndex(user => user._id === userId)
    if(idx === -1) throw `Couldn't find user with _id ${userId}`
    users.splice(idx, 1)

    utilService.saveUserToFile('./data/user.json', users)
  
  } catch (err) {
    loggerService.error(err)
    throw (err)
  }

}
async function save(user) {

  user._id = utilService.makeId()
  user.score = 10000
  if (!user.imgUrl) user.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
      // TODO: severe security issue- attacker can post admins
  users.push(user)
  await _saveUsersToFile()
  return user
  // try {
  //   if(userToSave._id){
  //     var idx = users.findIndex(user => user._id === userToSave._id)
  //     if(idx === -1) throw `Couldn't find user with _id ${userId}`
  //     users.splice(idx, 1, userToSave)
  //   }
  //   else{
  //     userToSave._id = utilService.makeId()
  //     users.push(userToSave)
  //   }
  //   utilService.saveUserToFile('./data/user.json', users)
  //   return(userToSave)
  // } catch (err) {
  //   loggerService.error(err)
  //   throw (err)
  // }
}

