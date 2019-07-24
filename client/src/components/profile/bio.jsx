import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Input from "../input";

const BioDiv = styled.div`
  grid-column-start: 2;
  grid-column-end: 11;
  padding: 0px 0px 0px 5px;
`;

const I = styled.i`
  color: #3a3a3a;
  font-size: 10px;
  margin-left: 3px;
  cursor: pointer;
`;

const BioInput = styled(Input)`
  display: inline-block;
  width: 75%;
  padding: 5px;
  height: 18px;
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
    <BioDiv>
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
        <React.Fragment>
          <small>{bio || "bio"}</small>
          <I onClick={flipEdit} className="fas fa-edit" />
        </React.Fragment>
      )}
    </BioDiv>
  );
};

export default Bio;
