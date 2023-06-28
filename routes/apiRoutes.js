const note_data = require("../db/note_data");
const { v4: uuidv4 } = require("uuid");

module.exports = function (app) {
  // GET /api/notes - Read the note_data array and return all saved notes as JSON
  app.get("/api/notes", function (req, res) {
    res.json(note_data);
  });

  // POST /api/notes - Receive a new note to save on the request body, add it to the note_data array, and return the new note to the client
  app.post("/api/notes", function (req, res) {
    const newNote = {
      id: uuidv4(),
      title: req.body.title,
      text: req.body.text,
    };
    note_data.push(newNote);
    res.json(newNote);
  });

  // DELETE /api/notes/:id - Delete a note with the given ID from the note_data array
  app.delete("/api/notes/:id", function (req, res) {
    const noteId = req.params.id;
    const index = note_data.findIndex((note) => note.id === noteId);
    if (index !== -1) {
      note_data.splice(index, 1);
      res.json({ success: true });
    } else {
      res.status(404).json({ error: "Note not found" });
    }
  });
};
