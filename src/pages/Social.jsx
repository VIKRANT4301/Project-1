/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import './social.css'; // Optional: Add custom styles for this page

const Social = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [message, setMessage] = useState("");
  const [socialFeed, setSocialFeed] = useState([]); // Store uploaded images in the feed

  // Handle file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file)); // Generate image preview URL
    }
  };

  // Handle form submission (simulating image upload)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedImage) {
      const newPost = {
        id: Date.now(),
        image: previewUrl,
        likes: 0,
        comments: [],
      };
      setSocialFeed([newPost, ...socialFeed]); // Add new post to social feed
      setMessage("Image uploaded successfully!");
      setSelectedImage(null);
      setPreviewUrl("");
    } else {
      setMessage("Please select an image to upload.");
    }
  };

  // Handle like on a post
  const handleLike = (id) => {
    setSocialFeed(socialFeed.map(post => 
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  // Handle comment on a post
  const handleComment = (id, comment) => {
    if (comment) {
      setSocialFeed(socialFeed.map(post => 
        post.id === id ? { ...post, comments: [...post.comments, comment] } : post
      ));
    }
  };

  return (
    <div className="social-container">
      <header className="social-header">
        <h1>Social Moments</h1>
        <p>Share your moments, interact, and make connections.</p>
      </header>

      {/* Image Upload Section */}
      <section className="upload-section">
        <h2>Upload Your Image</h2>
        <form onSubmit={handleSubmit} className="upload-form">
          <label htmlFor="image-upload" className="upload-label">
            Choose an image
          </label>
          <input 
            type="file" 
            id="image-upload" 
            accept="image/*"
            onChange={handleImageChange} 
          />
          
          {previewUrl && (
            <div className="preview-container">
              <h3>Image Preview:</h3>
              <img src={previewUrl} alt="Preview" className="preview-image" />
            </div>
          )}
          
          <button type="submit" className="upload-button">Upload</button>
        </form>

        {/* Display feedback message */}
        {message && <p className="message">{message}</p>}
      </section>

      {/* Social Feed Section */}
      <section className="social-feed">
        <h2>Social Feed</h2>
        <div className="feed-container">
          {socialFeed.map((post) => (
            <div key={post.id} className="post">
              <img src={post.image} alt="Social Post" className="post-image" />
              <div className="post-actions">
                <button onClick={() => handleLike(post.id)} className="like-button">
                  Like {post.likes}
                </button>
                <div className="comments">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleComment(post.id, e.target.value);
                        e.target.value = "";
                      }
                    }}
                  />
                  <ul>
                    {post.comments.map((comment, index) => (
                      <li key={index}>{comment}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Social;
