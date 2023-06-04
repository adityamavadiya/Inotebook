const express = require("express");
const fetchuser = require("../midddleware/fetchUser");
const router = express.Router();
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// Route 1: fetch all notes
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (err) {
    console.log(err);
    res.status(500).send("Some error occured!");
  }
});

// Route 2: Add a new Note using POST: "/api/auth/addnote". Login Required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title.").isLength({ min: 3 }),
    body(
      "description",
      "Description must be of atleast 5 characters."
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      // if there are errors then return bad request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();
      res.json({ savedNote });
    } catch (err) {
      console.log(err);
      res.status(500).send("Some error occured!");
    }
  }
);

// Route 3: Update an existing note using Put "/api/notes/updatenote"
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    // create a newNote object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // find note to be updated and update it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      res.status(400).send("Not found!");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed!");
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (err) {
    console.log(err);
    res.status(500).send("Some error occured!");
  }
});

// Route 4: Delete an existing note using delete: "/api/notes/deletenote/:id"
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // find note to be deleted and delete it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      res.status(400).send("Not found!");
    }

    // allow deletion only if user owns this note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed!");
    }

    note = await Notes.findByIdAndDelete(req.params.id);

    res.json({ Success: "Note has been deleted", note: note });
  } catch (err) {
    console.log(err);
    res.status(500).send("Some error occured!");
  }
});
module.exports = router;
