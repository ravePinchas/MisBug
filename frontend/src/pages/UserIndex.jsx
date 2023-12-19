import { userService } from '../services/user.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { UserList } from '../cmps/User/UserList.jsx'
import { useState } from 'react'
import { useEffect } from 'react'
import { UserFilter } from '../cmps/User/UserFilter.jsx'


export function UserIndex() {
  const [users, setUsers] = useState([])
  const [filterBy, setFilterBy] = useState(userService.getDefaultFilter())

  useEffect(() => {
    loadUsers()
  }, [filterBy])

  async function loadUsers() {
    try {
      const users = await userService.query(filterBy)
      setUsers(users)
    }
    catch (err) {
      console.log('couldent load users', err)
    }

  }

  async function onRemoveUser(userId) {
    try {
      await userService.remove(userId)
      console.log('Deleted Succesfully!')
      setUsers(prevUsers => prevUsers.filter((user) => user._id !== userId))
      showSuccessMsg('User removed')
    } catch (err) {
      console.log('Error from onRemoveUser ->', err)
      showErrorMsg('Cannot remove user')
    }
  }

  async function onAddUser() {
    const user = {
      title: prompt('User title?'),
      severity: +prompt('User severity?'),
    }
    try {
      const savedUser = await userService.save(user)
      console.log('Added user', savedUser)
      setUsers(prevUsers => [...prevUsers, savedUser])
      showSuccessMsg('User added')
    } catch (err) {
      console.log('Error from onAddUser ->', err)
      showErrorMsg('Cannot add user')
    }
  }

  async function onEditUser(user) {
    const severity = +prompt('New severity?')
    const userToSave = { ...user, severity }
    console.log(userToSave);
    try {
      const savedUser = await userService.save(userToSave)
      console.log('Updated user:', savedUser)
      setUsers(prevUsers => prevUsers.map((currUser) =>
        currUser._id === savedUser._id ? savedUser : currUser
      ))
      showSuccessMsg('User updated')
    } catch (err) {
      console.log('Error from onEditUser ->', err)
      showErrorMsg('Cannot update user')
    }
  }

  function onSetFilterBy(filterBy) {
    setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
  }

  return (
    <main className="main-layout">
      <h3>Users App</h3>
      <main>
        <UserFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
        <button onClick={onAddUser}>Add User ⛐</button>
        <UserList users={users} onRemoveUser={onRemoveUser} onEditUser={onEditUser} />
      </main>

    </main>
  )
}
