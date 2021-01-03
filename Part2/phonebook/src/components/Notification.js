import React from 'react'

const Message = ({ text }) => {

    if (text === null) {
        return null;
    }

    return (
        <div className='message'>
            {text}
        </div>
    )
}

const Error = ({ text }) => {
    if (text === null) {
        return null;
    }
    
    return (
        <div className='error'>
            {text}
        </div>
    )
}

export {
    Message,
    Error
}