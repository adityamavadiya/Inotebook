import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const s1 = {
    name: "Harry",
    class: "xE",
  };

  const [state, setState] = useState(s1);
  const update = () => {
    setTimeout(() => {
      setState({
        name: "Larry",
        class: "11b",
      });
    }, 1000);
  };

  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);
  let a = 1;
  // Add a note
  const addNote = async (title, description, tag) => {
    // TODO: Api call
    console.log("Adding a new note.");
    const data = 0;
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ3YjBlZjI2YTgzYThmZWY4NWI2YjIwIn0sImlhdCI6MTY4NjAyMjAyMX0.JcXM1WDBGzfNNIEZgNuXd8SR5Je2UWpGsWT00A_dUY8",
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    const json = response.json(); // parses JSON response into native JavaScript objects
    a++;
    const note = {
      _id: "aa7cec7f1a67f3c90c38eaa8" + a,
      user: "647b0ef26a83a8fef85b6b20",
      title: title,
      description: description,
      tag: tag,
      date: "2023-06-04T19:56:47.394Z",
      __v: 0,
    };

    setNotes(notes.concat(note));
  };

  // delete a note
  const deleteNote = (id) => {
    // TODO: Api call
    const notes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(notes);
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    const data = 0;
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ3YjBlZjI2YTgzYThmZWY4NWI2YjIwIn0sImlhdCI6MTY4NTk4ODY2M30.1dGo-GmUUUG3wjgF7BsATQsfDtR4BrrB2Vugt2xfK7k",
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    const json = response.json(); // parses JSON response into native JavaScript objects

    // logic to edit notes
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        notes[index].title = title;
        notes[index].description = description;
        notes[index].tag = tag;
        break;
      }
    }
    setNotes(notes);
  };
  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;

// {
//   _id: "647cec671a67f3c90c38eaf6",
//   user: "647b0ef26a83a8fef85b6b20",
//   title: "My Title",
//   description: "Please wake up early",
//   tag: "personal",
//   date: "2023-06-04T19:56:23.085Z",
//   __v: 0,
// },
// {
//   _id: "z47cec7f1a67f3c90c38eaf8",
//   user: "647b0ef26a83a8fef85b6b20",
//   title: "My Title 2",
//   description: "Sleep early!",
//   tag: "personal",
//   date: "2023-06-04T19:56:47.394Z",
//   __v: 0,
// },
// {
//   _id: "647cec7cdca67f3c90c38eaf8",
//   user: "647b0ef26a83a8fef85b6b20",
//   title: "My Title 2",
//   description: "Sleep early!",
//   tag: "personal",
//   date: "2023-06-04T19:56:47.394Z",
//   __v: 0,
// },
// {
//   _id: "647cec7a1a67f3c90c38eaf8",
//   user: "647b0ef26a83a8fef85b6b20",
//   title: "My Title 2",
//   description: "Sleep early!",
//   tag: "personal",
//   date: "2023-06-04T19:56:47.394Z",
//   __v: 0,
// },
