import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Note from "./components/Note";
import noteService from './services/NoteService'
import NoteService from "./services/NoteService";



const Button = ({ event, text }) => {
  return <button onClick={event}>{text}</button>;
};

const App = (props) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);

  const loadDataHook = () => {
    noteService
      .getAll()
      .then(initialNotes => {
        console.log('response fufilled, inital notes fetched')
        setNotes(initialNotes)
      })
  }
  useEffect(loadDataHook, [])

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
    };
    
    NoteService
      .create(noteObject)
      .then(createdNote => {
        console.log(createdNote)
        setNotes(notes.concat(createdNote))
        setNewNote('') //blank field
      }
      )
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important } //copy all of the properties in the found note and replace its importance

    NoteService
      .update(id, changedNote)
      .then(updatedNote => {
        setNotes(notes.map(n => n.id !== id ? n : updatedNote))
        //cool use of map function conditionally copy values for an array to a returned one if it doesnt have the changed id..
      })
      .catch(error => {
        alert(`the note "${note.content}" was already deleted from server`)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const notesToShow = () => {
    return showAll ? notes : notes.filter((n) => n.important === true);
  };

  const handleShowClick = () => {
    setShowAll(!showAll);
  };

  const handleClear = () => {
    NoteService.clear()
    notesToShow();
  };

  return (
    <div>
      <h1>Notes</h1>
      <Button
        event={handleShowClick}
        text={showAll ? "show important" : "show all"} />
      <Button event={handleClear} text="clear" />

      <ul>
        {notesToShow().map((note, i) => (
          <Note key={i} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
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


ReactDOM.render(<App />, document.getElementById('root'))