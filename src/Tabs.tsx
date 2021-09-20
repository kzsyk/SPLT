import styled from "styled-components";

type Tab = {
  active: boolean;
}

export const Tabs = styled.div`
  overflow: hidden;
  font-family: Open Sans;
  height: 3em;
`;

export const Tab = styled.button<Tab>`
  border: none;
  outline: none;
  cursor: pointer;
  width: 32%;
  position: relative;

  margin-right: 0.1em;
  font-size: 1em;
  border: ${props => (props.active ? "1px solid #ccc" : "")};
  border-bottom: ${props => (props.active ? "none" : "")};
  background-color: ${props => (props.active ? "white" : "lightgray")};
  height: ${props => (props.active ? "3em" : "2.6em; top:.4em")};
  transition: background-color 0.5s ease-in-out;

  :hover {
    background-color: white;
  }
`;

export const Content = styled.div<Tab>`
  ${props => (props.active ? "" : "display:none")};
  padding:3em;

`;