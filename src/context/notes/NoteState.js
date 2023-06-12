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

  // Get all note
  const getNotes = async () => {
    // TODO: Api call
    try {
      console.log("Fetching all notes.");
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ3YjBlZjI2YTgzYThmZWY4NWI2YjIwIn0sImlhdCI6MTY4NjA4MTg0MH0.NScD_4SBe4F3ywDkuQo_Qo7jz4ZExeOpsh52b-4nrII",
        },
      });
      const json = await response.json(); // parses JSON response into native JavaScript objects
      console.log(json);
      setNotes(json);
    } catch (error) {
      console.error("An error occurred:", error);
      // Display an error message to the user
    }
  };

  // Add a note
  const addNote = async (title, description, tag) => {
    // TODO: Api call
    console.log("Adding a new note.");
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ3YjBlZjI2YTgzYThmZWY4NWI2YjIwIn0sImlhdCI6MTY4NjA4MTg0MH0.NScD_4SBe4F3ywDkuQo_Qo7jz4ZExeOpsh52b-4nrII",
        Accept: "application/json",
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    const note = await response.json(); // parses JSON response into native JavaScript objects
    setNotes(notes.concat(note));
  };

  // delete a note
  const deleteNote = async (id) => {
    // TODO: Api call

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ3YjBlZjI2YTgzYThmZWY4NWI2YjIwIn0sImlhdCI6MTY4NjI0NjI3NH0.pvDWElpfGtuRT13MZkqY6wqTVu9q5Bl69VDELVp-Rt4",
      },
    });

    const json = await response.json();
    console.log(json);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    console.log("hello!");
    const data = 0;
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ3YjBlZjI2YTgzYThmZWY4NWI2YjIwIn0sImlhdCI6MTY4NTk4ODY2M30.1dGo-GmUUUG3wjgF7BsATQsfDtR4BrrB2Vugt2xfK7k",
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes));
    // logic to edit notes
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };
  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}
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
