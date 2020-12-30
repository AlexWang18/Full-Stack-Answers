//displays all the data per each course sent to it

const Header = ({ name }) => {

    return (
        <h1>{name}</h1>
    )
}

const Total = ({ parts }) => {

    const sum = parts.map(p => p.exercises).reduce((acc, cV) => { //could have done without the map if i provided an inital value to the reduce and used fields
        console.log(cV)
        return acc + cV
    });
    return (
        <p><strong>Number of exercises {sum}</strong></p>
    )
}

const Part = ({name, exercises }) => {

    return (
        <p>
            {name} {exercises}
        </p>
    )
}

const Content = ({ parts }) => {
    console.log(parts[0])

    return (
        //map each part into a new Part component
        <div>
            {parts.map(p =>
                <li key={p.id}>
                    <Part name={p.name} exercises={p.exercises} />
                </li>)}
        </div>
    )
}

const Course = ({ course }) => {
    console.log(course.parts)
    return (
        <>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </>
    )
}

export default Course