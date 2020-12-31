import React from 'react'
//dont need a submit
const Form = (props) => {
    return (
        <form>
            <div>
                <h1>Find Countries</h1>
                <input value={props.newSearch} onChange={props.handleSearch}></input>
            </div>
        </form>
    )
}

export default Form;