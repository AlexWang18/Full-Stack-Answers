const Person = ({ name, number }) => {
    return (
        <li>
            {name} {number}
        </li>
    )
}

const Persons = ({ persons }) => {
    return (
    <ul>
        {persons.map(p => <Person key={p.name} name={p.name} number={p.number} />)}
    </ul>
    )
}
//i can export a single component
export default Persons