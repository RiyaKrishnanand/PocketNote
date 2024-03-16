// Import necessary functions from the React library
import { createContext, useState } from "react";

// Create a new context called NoteContext
const NoteContext = createContext({
  // Initial default values for the context
  notes: [],               // Array to store notes
  setNotes: () => {},     // Function to update notes
  selected: "",           // Selected item
  setSelected: () => {},  // Function to update selected item
});

// Define a Provider component to provide the context values to its children
const Provider = ({ children }) => {
  // Declare state variables for selected item and notes
  const [selected, setSelected] = useState("");
  const [notes, setNotes] = useState([]);

  // Create an object containing context values to share
  const valueToShare = {
    notes,            // Current notes
    setNotes,         // Function to update notes
    selected,         // Current selected item
    setSelected,      // Function to update selected item
  };

  // Render the NoteContext.Provider with the valueToShare as the value prop
  return (
    <NoteContext.Provider value={valueToShare}>
      {children}  {/* Render the children components */}
    </NoteContext.Provider>
  );
};

// Export the Provider component as a named export
export { Provider };

// Export the NoteContext as a default export
export default NoteContext;
