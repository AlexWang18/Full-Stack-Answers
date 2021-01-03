import React from 'react'

/* I tried to declare event handlers inside this seperate class but had difficulty than returning the 
//state of the persons back to the App component to render, forced to pass them as props so they can be shared across components
*/

const Form = (props) => {

    return (
        <form onSubmit={props.addPerson}>
            <div>
                name: <input value={props.newName} onChange={props.handleName} />
            </div>
            <div>
                number: <input value={props.newNum} onChange={props.handleNum} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export {
    Form
}