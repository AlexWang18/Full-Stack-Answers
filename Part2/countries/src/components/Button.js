import React from 'react'

const Button = ({ handleShow }) => {
    console.log('from button')
    return (
        <button onClick={handleShow}>show</button>
    )
}

export default Button;