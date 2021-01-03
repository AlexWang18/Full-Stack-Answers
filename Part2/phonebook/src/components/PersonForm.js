import React from 'react'

/* I tried to declare event handlers inside this seperate class but had difficulty than returning the 
//state of the persons back to the App component to render, forced to pass them as props so they can be shared across components
*/

const Form = (props) => {

    return (
        <form onSubmit={props.addPerson}>
            <div>
                <label htmlFor = "name">Name: </label>
                <input name = "name" value={props.newName} onChange={props.handleName} />
            </div>
            <div>
                <label htmlFor = "phone">Phone number: </label>
                <input name = "phone" type = "tel" value={props.newNum} onChange={props.handleNum} />
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