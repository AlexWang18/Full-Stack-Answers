import React from 'react'

const Country = ({ name }) => {
    return (
        <li>
            {name}
        </li>
    )
}

const Countries = ({ result }) => {
    if (result.length > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    }
    else if (result.length === 1) {
        const single = result[0]
        return (
            <>

                <h1>{single.name}</h1>
                <p>capital {single.capital}</p>
            </>
        )
    }

    return (
        <ul>
            {result.map(c => <Country key = {c.gini} name={c.name} />)}
        </ul>
    )
}

export default Countries;