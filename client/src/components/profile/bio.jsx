import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Input from "../input";

const I = styled.i`
  color: white;
  font-size: 8px;
  margin-left: 3px;
  cursor: pointer;
`;

const BioInput = styled(Input)`
  display: inline-block;
  width: 150px;
  padding: 5px;
  height: 16px;
  font-size: 12px;
`;

const Bio = ({ bio, onSave }) => {
  const [onEdit, setOnEdit] = useState(false);
  const [_bio, setBio] = useState("");

  const flipEdit = () => setOnEdit(!onEdit);
  const handleSave = e => {
    if (bio === _bio) return flipEdit();
    onSave(_bio);
    flipEdit();
  };

  useEffect(() => {
    setBio(bio);
  }, [bio]);

  return (
    <React.Fragment>
      {onEdit ? (
        <React.Fragment>
          <BioInput
            maxLength="25"
            value={_bio}
            onChange={({ target }) => setBio(target.value)}
          />
          <I onClick={handleSave} className="fas fa-save" />
        </React.Fragment>
      ) : (
        <span onClick={() => setOnEdit(true)}>{bio || "bio"}</span>
      )}
    </React.Fragment>
  );
};

export default Bio;
