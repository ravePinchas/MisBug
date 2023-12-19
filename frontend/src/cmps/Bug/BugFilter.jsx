import { useEffect, useState } from "react"

export function BugFilter({ filterBy, onSetFilterBy }) {

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


  const { text, severity } = filterByToEdit
  return (
    <section className="bug-filter">
      <h2>Filter Our Cars</h2>
      <form onSubmit={onSubmitFilter}>
        <label htmlFor="text">Title: </label>
        <input value={text} onChange={handleChange} type="text" placeholder="By Title" id="text" name="text" />

        <label htmlFor="severity"> Severity: </label>
        <input value={severity} onChange={handleChange} type="number" placeholder="By Severity" id="severity" name="severity" />

        <button>Set Filter</button>
      </form>
    </section>
  )
}