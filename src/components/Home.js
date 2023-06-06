import React, { useContext } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import noteContext from "../context/notes/noteContext";
import Notes from "./Notes";
import AddNote from "./AddNote";

export const Home = () => {
  return (
    <div>
      <Notes />
    </div>
  );
};
