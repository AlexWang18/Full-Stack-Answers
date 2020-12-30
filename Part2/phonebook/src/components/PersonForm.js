
const PersonForm = ({ event }) => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ])
    const [newName, setNewName] = useState('')

    const addPerson = () => {

        event.preventDefault();

        if (persons.some(p => p.name === newName)) {
            console.log('not cool');
            window.alert(`${newName} is already added to phonebook`);
            return;
        }

        const personObj = {
            name: newName.trim(),
            date: new Date().toISOString,
            number: newNum,
            id: persons.length + 1
        }
        //copy the newly created object to new array 
        setPersons(persons.concat(personObj))
        setNewName('') //resets the value of input
    }
    return (
        <form onSubmit={addPerson}>
            <div>
                name: <input value={newName} onChange={handleNewP} />
            </div>
            <div>
                number: <input value={newNum} onChange={handleNewNum} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm