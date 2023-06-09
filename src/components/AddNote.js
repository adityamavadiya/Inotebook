import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = () => {
  const context = useContext(noteContext);
  const { state, notes, addNote } = context;
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "default",
  });
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
  };

  const onChange = (e) => {
    e.preventDefault();
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div className="container my-3">
        <h2>Add a Note</h2>

        <form className="my-3">
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              aria-describedby="emailHelp"
              placeholder="Enter Title"
              name="title"
              onChange={onChange}
              value={note.title}
              minLength={5}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              placeholder="Description"
              name="description"
              onChange={onChange}
              value={note.description}
              minLength={5}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Tag</label>
            <input
              type="text"
              className="form-control"
              id="tag"
              placeholder="Tag"
              name="tag"
              value={note.tag}
              onChange={onChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
            disabled={note.tag.length < 5 || note.description.length < 5}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
