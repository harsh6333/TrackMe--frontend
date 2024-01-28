import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import "../../css/notes.css";
import NavbarM from "../Navbar";
import axios from "axios";

interface Note {
  title: string;
  content: string;
  id: number;
}

const Notes: React.FC = () => {
  const [note, setNote] = useState<Note>({
    title: "",
    content: "",
    id: 0,
  });
  const authToken = localStorage.getItem("authToken");
  const [idnumber] = useState(1);
  const [notes, setNotes] = useState<Note[]>([]);
  const [isnotesupdated, setIsNotesUpdated] = useState(false);
  const [editIndex, setEditIndex] = useState(-1); // Initialize as -1 to show no edit happening/activated.

  const handleNoteChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNote((prevnote) => {
      return { ...prevnote, [name]: value, id: idnumber };
    });
  };

  useEffect(() => {
    if (isnotesupdated) {
      const headers = {
        Authorization: `${authToken}`,
        "Content-Type": "Application/json",
      };

      axios
        .post(
          `${import.meta.env.VITE_SERVER_URL}/api/add-notes`,
          { data: notes },
          { headers }
        )
        .then(() => {})
        .catch((error) => {
          console.error("Error adding task:", error);
        });
    }
    setIsNotesUpdated(false);
  }, [isnotesupdated, notes, authToken]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/api/get-notes`, {
        headers: {
          Authorization: `${authToken}`,
          "Content-Type": "Application/json",
        },
      })
      .then((resp) => {
        const existingnotes = resp.data.usernotes;
        setNotes(existingnotes);
      });
  }, [authToken]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (editIndex === -1) {
      // Add a new note
      setNotes((prev) => [...prev, note]);
    } else {
      // Edit an existing note
      const updatedNotes = [...notes];
      updatedNotes[editIndex] = note;
      setNotes(updatedNotes);
      setEditIndex(-1); // Reset edit mode
    }
    setIsNotesUpdated(true);
    setNote({ title: "", content: "", id: 0 });
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setNote(notes[index]);
  };

  const handleCancelEdit = () => {
    setEditIndex(-1); // Cancel edit mode
    setNote({ title: "", content: "", id: 0 });
  };

  const handleDelete = async (index: number) => {
    // Create a copy of the notes array and remove the note at the given index
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
    await axios.delete(`${import.meta.env.VITE_SERVER_URL}/api/delete-note`, {
      headers: {
        Authorization: `${authToken}`,
        "Content-Type": "Application/json",
      },
      data: { index: index },
    });
  };

  return (
    <>
      <NavbarM />
      <div className="notes-container">
        <form
          action=""
          className="notes-form-container"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Title"
            value={note.title}
            name="title"
            required
            onChange={handleNoteChange}
          />
          <textarea
            cols={30}
            rows={10}
            placeholder="Content"
            value={note.content}
            onChange={handleNoteChange}
            name="content"
            required
          ></textarea>
          {editIndex !== -1 ? (
            <div>
              <button
                type="button"
                onClick={handleCancelEdit}
                className="cancel-edit"
              >
                Cancel Edit
              </button>
              <button type="submit" className="save-edit">
                Save Edit
              </button>
            </div>
          ) : (
            <button type="submit" className="add-note">
              Add Note
            </button>
          )}
        </form>
        <div className="display-notes">
          {notes.map((not, index) => (
            <div className="display-note" key={index}>
              <h2>{not.title}</h2>
              <p>{not.content}</p>
              <button onClick={() => handleEdit(index)} className="edit-note">
                Edit
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="delete-note"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Notes;
