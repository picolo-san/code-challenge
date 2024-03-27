import styled from "styled-components";

export const HeaderWraper = styled.header`
  display: flex;
  flex-flow: row;
  width: 100%;
  -webkit-box-pack: justify;
  justify-content: space-between;
  position: fixed;
  top: 0px;
  left: 0px;
  height: 72px;
  flex-direction: row-reverse;
  padding: 20px 12px;
  box-sizing: border-box;
  background-color: rgb(39, 38, 44);
  z-index: 10;
`;
