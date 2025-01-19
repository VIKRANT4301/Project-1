// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import "./share.css";

const Share = () => {
  const [content, setContent] = useState("");

  const handleShare = () => {
    console.log("Shared content:", content);
    setContent(""); // Clear input after sharing
  };

  return (
    <div className="share">
      <textarea
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button onClick={handleShare}>Share</button>
    </div>
  );
};

export default Share;
