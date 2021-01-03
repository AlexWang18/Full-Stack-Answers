//Node uses Common JS modules bc its older
//const http = require('http'); 

const express = require('express') 
const app  = express();  //creates express server, factory func

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
    res.send('<h1>Hello World!</h1>')
})

//if they go to the url localhost port num /api/notes
app.get('/api/notes', (req, res) => {
    //res.json({user: 'alex'})
    res.json(notes)
    //use json method of response, formats the array into a JSON string 
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


