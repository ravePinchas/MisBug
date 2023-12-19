
import { Link } from 'react-router-dom'
import { BugPreview } from './BugPreview'
import { userService } from '../../services/user.service'
import { useEffect } from 'react'

export function BugList({ bugs, onRemoveBug, onEditBug, loggedinUser }) {

  // useEffect(() => {
  //   setBugs((prevBugs) => [...prevBugs, bugs])
  // }, [loggedinUser])

  function isOwnedByUser(bug) {
    return loggedinUser?.isAdmin || loggedinUser?._id === bug?.owner?._id
  }

  return (
    <ul className="bug-list">
      {bugs.map((bug) => (
        <li className="bug-preview" key={bug._id}>
          <BugPreview bug={bug} />
          <div>
            {isOwnedByUser(bug) && <button onClick={() => { onRemoveBug(bug._id) }}>x</button>}
            {isOwnedByUser(bug) && <button onClick={() => { onEditBug(bug) }}>Edit</button>}
          </div>
          <Link to={`/bug/${bug._id}`}>Details</Link>
        </li>
      ))}
    </ul>
  )
}
