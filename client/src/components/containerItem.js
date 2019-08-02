import styled from "styled-components";

const ContainerItem = styled.div`
  background: ${({ isDark }) => (isDark ? "#2e2e2e" : "#fff")};
  color:  ${({ isDark }) => (isDark ? "white" : "#000")};
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);
  padding: 5px;
  font-size: 12px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;

  @media only screen and (max-width: 600px) {
    font-size: 16px;
  }

  i {
    cursor: pointer;
  }
`;

export default ContainerItem;
