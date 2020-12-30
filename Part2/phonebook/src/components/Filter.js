import React from 'react'

const Filter = (props) => {
    return (
        <form>
            Filter results by<input value = {props.filter} onChange = {props.filterHandler} />
        </form>
    )
}

export default Filter;