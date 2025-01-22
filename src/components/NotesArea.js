import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Image from "../assets/image-removebg-preview.png";

const NotesArea = ({ selectedGroup, onAddNote, isSidebarOpen }) => {
  const [noteText, setNoteText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;

    onAddNote(noteText.trim());
    setNoteText("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  if (!selectedGroup) {
    return (
      <div
        className={`notes-empty-state ${
          isSidebarOpen ? "with-sidebar" : "without-sidebar"
        }`}
      >
        <div className="notes-image">
          <img
            src={Image}
            alt="Notes Illustration"
            className="placeholder-image"
          />
        </div>
        <h2 className="notes-title">Pocket Notes</h2>
        <p className="notes-description">
          Send and receive messages without keeping your phone online. <br />
          Use Pocket Notes on up to 4 linked devices and 1 mobile phone.
        </p>
        <p className="notes-footer">🔒 End-to-end encrypted</p>
      </div>
    );
  }

  return (
    <div
      className={`notes-area ${
        isSidebarOpen ? "with-sidebar" : "without-sidebar"
      }`}
    >
      <div className="notes-header">
        <div
          className="group-circle"
          style={{ backgroundColor: selectedGroup.color }}
        >
          {selectedGroup.initials}
        </div>
        <span>{selectedGroup.name}</span>
      </div>

      <div className="notes-list">
        {selectedGroup.notes.map((note) => (
          <div key={note.id} className="note-item">
            <p>{note.content}</p>
            <p className="timestamp">{note.timestamp}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="add-note-form">
        <div className="textarea-container">
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Enter your note here..."
            className="add-note-textarea"
            onKeyPress={handleKeyPress}
          />
          <button
            type="submit"
            disabled={!noteText.trim()}
            className={`textarea-button ${!noteText.trim() ? "disabled" : ""}`}
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default NotesArea;
