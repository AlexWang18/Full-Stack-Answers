
const Button = ({ id, handleClick }) => {

    return (
        <button onClick={() => handleClick(id)} >delete</button>
    )
}

const Person = ({ name, number, id, handleDelete }) => {
    return (
        <li>
            {name} {number} {<Button name={name} id={id} handleClick={handleDelete} />}
        </li>
    )
}

const Persons = ({ persons, handleDelete }) => {
    return (
        <ul>
            {persons.map(p => <Person key={p.id} name={p.name} number={p.number} id={p.id} handleDelete={handleDelete} />)}
        </ul>
    )
}

//i can export a single component
export default Persons