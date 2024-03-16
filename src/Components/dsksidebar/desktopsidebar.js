import React, { useEffect, useState } from "react"; // Importing necessary modules from React library
import "./DesktopSidebar.css"; // Importing CSS file for styling
import CreateNotesPopup from "../createNotesPopupDesktop/CreateNotesPopup"; // Importing component for creating notes popup
import NotesTitle from "../notesSidebar/NotesTitle"; // Importing component for displaying notes titles

function DesktopSidebar() {
  const [titles, setTitles] = useState([]); // State for storing notes titles
  const [showPopup, setShowPopup] = useState(false); // State for controlling visibility of create notes popup
  const [groupNamesParent, setGroupNamesParent] = useState( // State for storing group names retrieved from local storage or initialized as empty array
    localStorage.getItem("groupNames") || []
  );

  // useEffect hook to retrieve group names from local storage on component mount
  useEffect(() => {
    const data = localStorage.getItem("groupNames");
    if (data) {
      setGroupNamesParent(JSON.parse(data));
    } else {
      setGroupNamesParent([]);
    }
  }, []);

  // useEffect hook to update titles state when groupNamesParent state changes
  useEffect(() => {
    if (groupNamesParent.length > 0) {
      const obj = JSON.parse(localStorage.getItem("groupNames")); // Parse group names from local storage
      const result = Object.keys(obj).map((key) => [obj[key]]); // Convert object to array of values
      setTitles(result); // Set titles state with retrieved titles
    }
  }, [groupNamesParent]);

  // Function to handle click event for creating new notes group
  const handleClick = () => {
    setShowPopup(true); // Set showPopup state to true to display create notes popup
  };

  // Function to handle closing of create notes popup
  const handleClose = () => {
    setShowPopup(false); // Set showPopup state to false to hide create notes popup
  };

  // Render function
  return (
    <div className="desktop__sidebar">
      <div className="desktop__sidebar__title">Pocket Notes</div> {/* Displaying sidebar title */}
      <div className="desktop__sidebar__create__notes__btn">
        <button onClick={handleClick}>
          <span id="add">+</span>
          <span>Create Notes Group</span>
        </button>
      </div> {/* Button to create new notes group */}
      <div className="desktop__sidebar__notes__title">
        {titles.length > 0 ? ( // Conditionally render notes titles or message if no titles exist
          titles.map((title, index) => <NotesTitle key={index} title={title} />) // Mapping titles array to NotesTitle component
        ) : (
          <div className="desktop__sidebar__notes__title__empty">
            <p>No Notes Group Created</p>
          </div>
        )}
      </div> {/* Displaying notes titles or message */}
      {showPopup && ( // Conditionally rendering create notes popup based on showPopup state
        <div className="desktop__popup__overlay">
          <CreateNotesPopup
            groupNamesParent={groupNamesParent} // Passing groupNamesParent state as prop to create notes popup
            setGroupNamesParent={setGroupNamesParent} // Passing setGroupNamesParent function as prop to create notes popup
            onClose={handleClose} // Passing handleClose function as prop to create notes popup for handling close event
          />
        </div>
      )}
    </div>
  );
}

export default DesktopSidebar; // Exporting DesktopSidebar component
