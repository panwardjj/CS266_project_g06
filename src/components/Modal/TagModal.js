// TagModal.js

import React, { useState, useEffect  } from "react";
import "./TagModal.css"; // Import the CSS file


const TagModal = ({ todo, setTags, closeModal }) => {
  const [tagName, setTagName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [addSuccess, setaddSuccess] = useState(false);
  const validateInput = (newvalue) => {
    return /^[a-zA-Z0-9]*$/.test(newvalue); // Regex for alphanumeric characters
  };

  const handleAddTag = () => {
    if (tagName.trim() !== "") {
      
      setTags(todo, [...todo.tags, tagName.trim()]);
      setTagName("");
      setaddSuccess(true);
      closeModal();
    }
  };

  const handleInputChange = (event) => {
    const newvalue = event.target.value;
    setTagName(newvalue);

    if (newvalue.length < 5){
      setError('Name must be at least 5 characters long!');
    }
    if (!validateInput(newvalue)){
      setError('Only alphanumeric characters are  allowed!');
    }
    if (validateInput(newvalue) && (newvalue.length >= 5)){
      setError('');
      
      setSuccess('This name can save.')
    }
  }

  /*useEffect(() => {
    // Save tags to localStorage whenever tags change
    console.log("Tags updated:", todo.tags);
    localStorage.setItem("tags", JSON.stringify(todo.tags));
  }, [todo.tags]);*/
  

  return (
    <div className="tag-modal-overlay" onClick={closeModal}>
      <div className="tag-modal">
        <h2 className="tag-modal-title">Add Tags</h2>
        <div className="tag-modal-body">
          <input
            type="text"
            value={tagName}
            onChange={handleInputChange}
            onClick={(e) => e.stopPropagation()}
            placeholder="Enter tag name"
            className="border border-gray-300 p-2 rounded-md w-full"
            data-testid='tag-name-input'
          />
          
          {error && <p data-testid='error-message' style={{ color: 'red' }}>{error}</p>}
          {success && <p data-testid='success-message' style={{ color: 'green' }}>{success}</p>}
        </div>
        <div className="tag-modal-footer">
          <button onClick={(e) => handleAddTag(e)} className="tag-modal-button" >
            Add Tag
          </button>
          
          
          <button onClick={(e) => closeModal(e)} className="tag-modal-button">
            Close
          </button>
         
        </div>
        
        
    
      </div>
    </div>
  );
};

export default TagModal;
