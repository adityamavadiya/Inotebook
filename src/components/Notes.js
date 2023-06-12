import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    getNotes();
  }, []);

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const ref = useRef("null");
  const refClose = useRef("null");
  const updateNote = (currentnote) => {
    ref.current.click();
    setNote({
      id: currentnote._id,
      etitle: currentnote.title,
      edescription: currentnote.description,
      etag: currentnote.tag,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log("hello!");
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
  };

  const onChange1 = (e) => {
    e.preventDefault();
    // setNote({ ...note, [e.target.name]: e.target.value });
    setNote({ ...note, etitle: e.target.value });
  };

  const onChange2 = (e) => {
    e.preventDefault();
    // setNote({ ...note, [e.target.name]: e.target.value });
    setNote({ ...note, edescription: e.target.value });
  };

  const onChange3 = (e) => {
    e.preventDefault();
    // setNote({ ...note, [e.target.name]: e.target.value });
    setNote({ ...note, etag: e.target.value });
  };

  return (
    <>
      <AddNote />
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* from to edit note */}
              <form className="my-3">
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    aria-describedby="emailHelp"
                    placeholder="Enter Title"
                    name="title"
                    value={note.etitle}
                    onChange={onChange1}
                    minLength={5}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    placeholder="Description"
                    name="description"
                    value={note.edescription}
                    onChange={onChange2}
                    minLength={5}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Tag</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    placeholder="Tag"
                    name="tag"
                    value={note.etag}
                    onChange={onChange3}
                  />
                </div>
              </form>
              {/* form ends */}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleClick}
                ref={refClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
                disabled={note.etag.length < 5 || note.edescription.length < 5}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.map((note) => {
          return (
            <NoteItem key={note._id} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
