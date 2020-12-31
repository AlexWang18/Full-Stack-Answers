import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Note from "./components/Note";
import axios from 'axios'



axios //chain the returned promise and use the then method with callback
.get('http://localhost:3001/notes')
.then(response => {
    const notes = response.data
    console.log(notes)
})



const Button = ({ event, text }) => {
  return <button onClick={event}>{text}</button>;
};

const App = (props) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);
  const hook = () => {
      console.log('in the hook')
      axios
      .get('http://localhost:3001/notes')
      .then(response => {
          console.log('response fufilled')
          setNotes(response.data)
      })
  }
  useEffect(hook, [])
  
  console.log('render', notes.length, 'notes')

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      id: notes.length + 1
    };

    setNotes(notes.concat(noteObject));
    setNewNote("");
  };

  const handleNoteChange = (event) => {
    console.log(event.target);
    console.log(event.target.value);

    setNewNote(event.target.value);
  };

  const notesToShow = () => {
    return showAll ? notes : notes.filter((n) => n.important === true);
  };

  const handleClick = () => {
    setShowAll(!showAll);
  };

  const handleClear = () => {
    notes.length = 0;
    notesToShow();
  };

  return (
    <div>
      <h1>Notes</h1>
      <Button
        event={handleClick}
        text={showAll ? "show important" : "show all"}
      />
      <Button event={handleClear} text="clear" />
      <ul>
        {notesToShow().map((note, i) => (
          <Note key={i} note={note} />
        ))}
      </ul>
      {/* event handlers for html form*/}
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};


ReactDOM.render(<App/>, document.getElementById('root'))