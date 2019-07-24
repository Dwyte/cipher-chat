import React from "react";
import Avatar from "./avatar";
import Username from "./username";
import Bio from "./bio";
import Card from "../card";
import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-auto-rows: 1fr;
  grid-auto-columns: 1fr;
`;

const Logout = styled.div`
  grid-row-start: 1;
  grid-row-end: 3;
  grid-column-start: 11;
  grid-column-end: 12;
  margin: auto;
  border: 0px;
`;

const LogoutButton = styled.button`
  background: #2e2e2e;
  border: #3a3a3a;
  font-size: 26px;
  color: white;
  width: 42px;
  height: 42px;
`;

const Profile = ({ user, onUpdateBio }) => {
  const handleLogout = () => {
    localStorage.clear();

    window.location = "/";
  };

  return (
    <Card>
      <Grid>
        <Avatar />

        <Username username={user.username} />

        <Bio onSave={onUpdateBio} bio={user.bio} />

        <Logout onClick={handleLogout}>
          <LogoutButton className="pointer">
            <i className="fas fa-sign-out-alt" />
          </LogoutButton>
        </Logout>
      </Grid>
    </Card>
  );
};

export default Profile;
