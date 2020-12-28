import React, { useState } from 'react'

const alex = {
    name: "alex",
    workoutPRs = (bench, squat, deadlift) => {
        console.log("bench" + bench)
        console.log("total" + bench + squat + deadlift)
    },
    days: [
        mon, tues, weds, thurs, fri, sun
    ]
}
alex.workoutPRs(21, 55, 11)


const Hello = (props) => {
    const {name, age} = props //extract those properties from the object, could also just have {name, age} in func parameter

    const bornYear = () => new Date().getFullYear - age //no return statment? implicit? destructuring

    return (
        <div>
            <p>
                Hello {name}, you are {age} years old
        </p>
            <p>So you were probably born in {bornYear()}</p>    </div>
    )
}

//inheritance chains can lead to gorrilla banana problem or yuckY duplicaiton
// you request a banana but get a gorilla holding a banana and the whole jungle
//inheritance makes you predict the future, different functionality bound to occur
//composition is alpha i been sayinggg
const MurderRobotDog = (name) => {
    let state = {
        name: name,
        speed: 100,
        xpos = 0, ypos = 0
    }
    return Object.assign({}, barker(state), driver(state), killer(state))
    //takes an empty object and assigns the properties of other objects into it
    //gets the data for a barker driver and killer and merges them into an object
}

const gooddog = MurderRobotDog('alex')
gooddog.bark()

const App = () => {
    const arr = useState(0)
    arr[0] = counter //inital val of 0
    arr[1] = setCounter //set counter will modify the state

    const handleUserClick = () => {
        console.log("clicked lol")
    }
    
    setTimeout(
        () => setCounter(counter+1), 1000
    )

    return <div>
        <button onClick = {() => setCounter(counter+1)}>Click this</button> 
        {/* if we removed the () => we would be calling the function over and over again as it rerenders, so it must be a reference to a function or a functoon itself
        ah i see it cannot be a call.  */}
        <button onClick = {() => setCounter(0)}>Reset</button>
        {counter}
        </div>
}
const Display = ({counter}) => <> {counter} </>//implicit return

const App = () => {
    const [ counter, setCounter ] = useState(0)

    const increByOne = () => setCounter(counter+1)
    const decreByOne = () => {
        setCounter(counter+1)
    }
    const reset = () => setCounter(0)

    return (
    <>
    <Display counter = {counter}/>
    <Button handleClick = {increByOne} text = "plus"/>
    {/* when button is clicked the event handler is executed, when a function is called that changes the state, the component rerenders */}
    <Button handleClick = {decreByOne} text = "minus"/>
    <Button handleClick = {reset} text = "zero"/>
    </>)
}
const handleLeftClick = () => {
    setClicks({
        ...clicks, //copies all the properties of clicks object
        left: left + 1
    }) //forbidden in react to update an object directly, must copy properties that are not changed
    //keeping it in a single object leads to errors and more complexity.. doing it with an array we would use concat to make a copy instead of push455554=
}

// concat a string to log it using a comma instead of java way
//write debugger in sources in chrome to pause the app at a breakpoinmt\
// cannot use hook inside conditional, loop, or any non static place.. needs to always be called in same order

//event handlers must always be a function or reference to one - <button onClick = {has to be function here or ref}.. a variable / value will not work.. 
//bc that is mutating state directly.. cannot also be a function call.. will just be the return value of that function.. unless that function returns another function - ahah
//be careful on logging.. {() => console.log('click button')} correct way reference to arrow function is called
//better to define a const set to a function and just assign that constant to event. <button onClick = {constantHere}>click</button> //passed as onClick attribute

const hello = (who) => {
    return () => {
        console.log("Hello", who)
    }
}

const aPPp = () => {
    return (
        <div>
            <p>check this out</p>
            <button onClick = {hello('world')}></button>
            <button onClick = {hello('alex')}></button>
            <button onClick = {hello('passing what is this {} ')}></button>
        </div>
    )
}

//dont put components inside components -react will treat inside component as new component each render