import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
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

  const notesInitial = [
    {
      _id: "647cec671a67f3c90c38eaf6",
      user: "647b0ef26a83a8fef85b6b20",
      title: "My Title",
      description: "Please wake up early",
      tag: "personal",
      date: "2023-06-04T19:56:23.085Z",
      __v: 0,
    },
    {
      _id: "647cec7f1a67f3c90c38eaf8",
      user: "647b0ef26a83a8fef85b6b20",
      title: "My Title 2",
      description: "Sleep early!",
      tag: "personal",
      date: "2023-06-04T19:56:47.394Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(notesInitial);
  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
