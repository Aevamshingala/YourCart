import { useState, useEffect } from "react";
import "./App.css";

function Message({
  title = "Notification",
  message = "This is a creative notification message!",
  className = "",
  titleColor = "",
  messageColor = "",
  customStyles = {},
}) {
  const [close, setClose] = useState(false);

  // Auto-close the notification after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setClose(true);
    }, 5000); // Auto-close after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`frame ${className} ${close ? "hide" : ""}`}
      style={customStyles}
    >
      <div className="header">
        <h1 className="title" style={{ color: titleColor }}>
          {title}
        </h1>
        <button className="exitbutton" onClick={() => setClose(true)}>
          <span className="cancel"></span>
        </button>
      </div>
      <p className="message" style={{ color: messageColor }}>
        {message}
      </p>
    </div>
  );
}

export default Message;
