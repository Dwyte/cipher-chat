import React, { useState, useEffect } from "react";

const DisplayBio = ({ bio, onSave }) => {
  const [onEdit, setOnEdit] = useState(false);
  const [_bio, setBio] = useState("");

  const flipEdit = () => setOnEdit(!onEdit);
  const handleSave = () => {
    if (bio === _bio) return flipEdit();
    onSave(_bio);
    flipEdit();
  };

  useEffect(() => {
    setBio(bio);
  }, [bio]);

  return (
    <div id="display-bio">
      {onEdit ? (
        <React.Fragment>
          <input
            maxLength="50"
            value={_bio}
            onChange={({ target }) => setBio(target.value)}
          />
          <i onClick={handleSave} className="fas fa-save" />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <small>{bio || "bio"}</small>
          <i onClick={flipEdit} className="fas fa-edit" />
        </React.Fragment>
      )}
    </div>
  );
};

export default DisplayBio;
