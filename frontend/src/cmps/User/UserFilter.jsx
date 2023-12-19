import { useEffect, useState } from "react"

export function UserFilter({ filterBy, onSetFilterBy }) {

  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)


  useEffect(() => {
    onSetFilterBy(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    const field = target.name
    let value = target.value

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value || ''
        break;

      case 'checkbox':
        value = target.checked
        break

      default:
        break;
    }

    setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
  }

  function onSubmitFilter(ev) {
    ev.preventDefault()
    onSetFilterBy(filterByToEdit)
  }

  // function handleTxtChange({ target }) {
  //     const value = target.value
  //     setFilterByToEdit(prevFilter => ({ ...prevFilter, txt: value }))
  // }

  // function handleMinSpeedChange({ target }) {
  //     const value = target.value
  //     setFilterByToEdit(prevFilter => ({ ...prevFilter, minSpeed: value }))
  // }


  const { fullname, username, score } = filterByToEdit
  return (
    <section className="user-filter">
      <h2>Filter Our User</h2>
      <form onSubmit={onSubmitFilter}>
        <label htmlFor="fullname">Full Name: </label>
        <input value={fullname} onChange={handleChange} type="text" placeholder="By name" id="fullname" name="fullname" />

        <label htmlFor="username">username: </label>
        <input value={username} onChange={handleChange} type="text" placeholder="By username" id="username" name="username" />

        <label htmlFor="score">score: </label>
        <input value={score} onChange={handleChange} type="number" placeholder="By score" id="score" name="score" />

        <button>Set Filter</button>
      </form>
    </section>
  )
}