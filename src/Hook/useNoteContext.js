// Import necessary functions from the React library
import { useContext } from "react";
// Import the NoteContext from the specified path
import NoteContext from "../context/notecontext";

// Define a custom hook named useNoteContext
const useNoteContext = () => {
  // Utilize the useContext hook to access values provided by NoteContext
  // This hook returns the current context value provided by the nearest NoteContext.Provider
  return useContext(NoteContext);
}

// Export the useNoteContext hook as the default export of this module
export default useNoteContext;
