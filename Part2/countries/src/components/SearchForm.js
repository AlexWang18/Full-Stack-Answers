import React from 'react'

const Form = (props) => {
    return (
        <form>
            <div>
                <h1>Find Countries</h1>
                <input value={props.newSearch} onChange={props.handleSearch} autoFocus></input>
            </div>
        </form>
    )
}

export default Form;