//Node uses Common JS modules bc its older
//const http = require('http'); 

const { request } = require('express');
const express = require('express')
const app = express();  //creates express server, factory func

app.use(express.json()) //activate json parser i forgot... json() returns middleware

let notes = [
    {
        id: 1,
        content: "HTML is pretty easy",
        date: "2019-05-30T17:30:31.098Z",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only Javascript thanks to its built in run time engines",
        date: "2019-05-30T18:39:34.091Z",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        date: "2019-05-30T19:20:14.298Z",
        important: true
    }
]



app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>') //plain text/ html
})

//if they go to the url localhost port num /api/notes
app.get('/api/notes', (req, res) => {
    console.log(req.headers, 'made request')
    res.json(notes)
    //use json method of response, formats the array into a JSON string 
})
//fetch a single resource
app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id); //returns a string from request parameters property, have to parse 

    const note = notes.find(n => {
        return n.id === id
    })
    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    notes = notes.filter(n => n.id !== id)
    res.status(204).end() //no content
})

const generateId = () => {
    return (
        notes.length > 0 ?
            Math.max(...notes.map(n => n.id)) : 0 ) + 1 //change new array of Ids into individual numbers using spread syntax opposite of rest
}

app.post('/api/notes', (request, response) => {
    const body = request.body

    if (!body.content) { //no content
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const note = {
        content: body.content,
        important: body.important || false, //if important exists give it is value or default false
        date: new Date(),
        id: generateId(),
    }

    notes = notes.concat(note)

    response.json(note)
})

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
}) //tell the server to look for requests on local host 3001


/* const app = http.createServer((request, response) => {
    console.log('request made')
    //every time a http request is made execute this event handler
    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify(notes)) //array to JSON string will be type string, '{"name": "Bobby", "age": 35}' //so actual strings key or values are wrapped in ""
}) */
/*
function sum(a, b, c){
    return a + b + c
}

let arr = [2, 4, 5]

sum(...arr) //spread

var myName = ["alex", "tanlong", "wang"]

const[firstName, ...familyName] = myName
console.log(familyName) //rest, collect remaining elements to array, useful for sending a random number of elements to a function like (...data) => {

*/
