import React, { useEffect, useState } from "react";
import "./DesktopNotes.css";
import enter from "../../assets/icons/enter.png";
import DesktopNotesContent from "../notesContentDesktop/DesktopNotesContent";
import useNoteContext from "../../hooks/useNoteContext"; 

function DesktopNotes() {
  const [text, setText] = useState(""); // State for the content of the note
  const [bgColor, setBgColor] = useState("#fff"); // State for the background color
  const [initials, setInitials] = useState(""); // State for the initials of the selected group
  const [selectedTitle, setSelectedTitle] = useState(""); // State for the title of the selected group
  const { notes, setNotes, selected } = useNoteContext(); 

  useEffect(() => {
    // Effect to update notes and UI when the selected group changes
    setNotes(JSON.parse(localStorage.getItem(selected)) || []); // Retrieve notes from localStorage
    const groupNames = JSON.parse(localStorage.getItem("groupNames"));
    const selectedGroup = groupNames.find((group) => group.name === selected);
    if (selectedGroup) {
      // If selected group exists, update background color, initials, and title
      setBgColor(selectedGroup.color);
      setInitials(
        selectedGroup.name
          .split(" ")
          .map((word) => word.charAt(0))
          .join("")
          .toUpperCase()
      );
      setSelectedTitle(
        selectedGroup.name
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      );
    }
  }, [selected, setNotes]);

  const handleKeyDown = (e) => {
    // Handle keydown event, trigger save notes on "Enter" key
    if (e.key === "Enter") {
      e.preventDefault();
      handleSaveNotes();
    }
  };

  const handleSaveNotes = () => {
    // Save note to localStorage and update notes state
    if (!text.trim()) {
      return; // If note is empty, return
    }
    const notes = JSON.parse(localStorage.getItem(selected)) || []; // Retrieve notes
    const newNoteObj = {
      // Create new note object
      id: Date.now(),
      title: selected,
      content: text.trim(),
      date: new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      }),
      time: new Date().toLocaleTimeString(),
    };
    notes.push(newNoteObj); // Add new note to notes array
    localStorage.setItem(selected, JSON.stringify(notes)); // Save notes to localStorage
    setText(""); // Clear text area
    setNotes(notes); // Update notes state
  };

  const handleChange = (e) => {
    // Handle change in text area, update text state
    setText(e.target.value);
  };

  return (
    <div className="desktop__notes">
      <div className="desktop__notes__title">
        <div
          className="desktop__notes__title__color"
          style={{ backgroundColor: bgColor }}
        >
          {initials} {/* Display initials of selected group */}
        </div>
        <div className="desktop__notes__title__text">{selectedTitle}</div> {/* Display title of selected group */}
      </div>
      <div className="desktop__notes__content">
        {notes && notes.length > 0
          ? notes.map((note, index) => (
              <DesktopNotesContent key={index} note={note} />
            ))
          : null} {/* Render existing notes */}
      </div>
      <div className="desktop__notes__input">
        <textarea
          value={text}
          placeholder="Enter your notes here"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        ></textarea> {/* Text area for entering new notes */}
        <img src={enter} alt="enter" onClick={handleSaveNotes} /> {/* Icon to save note */}
      </div>
    </div>
  );
}

export default DesktopNotes;
