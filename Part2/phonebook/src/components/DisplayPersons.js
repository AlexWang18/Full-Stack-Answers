import BookServices from "./BookServices"

const Person = ({ name, number, id}) => {
    return (
        <li>
            {name} {number} {<Button name = {name} id = {id}/>}
        </li>
    )
}

const Button = ({ name, id }) => {
    const handleClick = () => {
        if (window.confirm(`Delete ${name} ?`)) {
            BookServices.deleteP(id)
            //does not refresh in current persons page
        }
    }
  
    return (
        <button onClick = {handleClick} >delete</button>
    )
  }

const Persons = ({ persons }) => {
    return (
        <ul>
            {persons.map(p => <Person key={p.name} name={p.name} number={p.number} id = {p.id}/>)}
        </ul>
    )
}
//i can export a single component
export default Persons