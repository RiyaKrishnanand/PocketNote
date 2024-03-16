// Import React library for creating components
import React from 'react';
// Import CSS file for styling the component
import "./dskhome/DesktopHome.css";
// Import image assets for displaying icons
import home from "../../images/homepg.png";
import lock from "../../images/lock.png";

// Define a functional component named DesktopHome
function DesktopHome() {
  return (
    // Render a div with class name 'desktop__home'
    <div className='desktop__home'>
      {/* Render an image displaying the home icon */}
      <img src={home} alt="home" />
      {/* Render an h1 element with the text "Pocket Notes" */}
      <h1>Pocket Notes</h1>
      {/* Render a paragraph element with some text describing the application */}
      <p>Send and receive messages without keeping your phone online.<br/>Use Pocket Notes on up to 4 linked Devices and 1 mobile phone.</p>
      {/* Render a div with class name 'desktop__home__bottom' */}
      <div className="desktop__home__bottom">
        {/* Render an image displaying the lock icon */}
        <img src={lock} alt="lock" />
        {/* Render a span element with the text "end-to-end encrypted" */}
        <span>end-to-end encrypted</span>
      </div>
    </div>
  );
}

// Export the DesktopHome component as the default export of this module
export default DesktopHome;
