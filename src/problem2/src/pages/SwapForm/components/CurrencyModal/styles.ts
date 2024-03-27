import styled from "styled-components";

export const Overlay = styled.div<{
  $isOpen: boolean;
}>`
  ${(props) =>
    props.$isOpen
      ? `opacity: 1; visibility: visible;`
      : `opacity: 0; visibility: hidden;`}
  z-index: 1040;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(244, 238, 255, 0.6);
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  position: fixed;
  transition: opacity 0.3s;
  transform: translateX(0px);
`;

export const Modal = styled.div`
  background-color: #27262c;
  width: 100%;
  overflow: hidden;
  display: grid;
  row-gap: 16px;
  box-sizing: border-box;
  padding: 20px 20px 0px 20px;
  flex-direction: column;
  position: relative;
  border-radius: 20px;
  width: 417.778px;
  grid-template-rows: 24px 40px 92px auto;
  height: 63vh;
  max-height: 670px;
  min-height: 356px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  height: auto;
  color: rgb(244, 238, 255);
  span {
    font-weight: 600;
    line-height: 1.1;
    font-size: 20px;
  }
  button {
    height: 24px;
    width: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    outline: none;
    cursor: pointer;
    background-color: transparent;
    border: none;
    color: rgb(31, 199, 212);
  }
`;

export const InputWraper = styled.div`
  display: flex;
  height: 40px;
  align-items: center;
  width: 100%;
  white-space: nowrap;
  outline: none;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  appearance: none;
  font-weight: 485;
  font-size: 16px;
  transition: border 100ms ease 0s;
  box-sizing: border-box;
  padding: 0px 12px;
  gap: 6px;
  background-color: rgb(55, 47, 71);
  border: 1px solid rgb(38, 33, 48);
  border-radius: 16px;
  box-shadow: rgba(74, 74, 104, 0.1) 0px 2px 2px -1px inset;
  color: rgb(244, 238, 255);
  input {
    flex-grow: 2;
    background: transparent;
    border: none;
    outline: none;
    font-weight: 485;
    font-size: 16px;
    color: #fff;
    display: flex;
    align-items: start;
    padding: 0px;
    box-sizing: border-box;
    &::placeholder {
      color: rgb(184, 173, 210);
    }
  }
  svg {
    height: 20px;
    width: 20px;
    color: rgb(184, 173, 210);
  }
`;

export const PopularToken = styled.button`
  background-color: transparent;
  padding: 4px 12px 4px 4px;
  border-radius: 16px;
  gap: 6px;
  svg:nth-child(2) {
    margin-left: 6px;
  }
  &:hover {
    background-color: rgb(19, 19, 19);
  }
  &:active {
    background-color: rgb(19, 19, 19);
  }
  align-items: center;
  opacity: 1;
  color: rgb(244, 238, 255);
  cursor: pointer;
  outline: none;
  border: 1px solid rgba(255, 255, 255, 0.07);
  font-size: 20px;
  font-weight: 535;
  width: auto;
  height: 36px;
  box-shadow: rgba(34, 34, 34, 0.04) 0px 0px 10px 0px;
  visibility: visible;
  animation: auto ease 0s 1 normal none running none;
  display: flex;
  line-height: 24px;
  align-self: center;
  margin: 4px;
`;

export const PopularTokens = styled.div`
  width: 100%;
  display: flex;
  padding: 0px;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
  flex-wrap: wrap;
  margin: -4px;
`;

export const FoundTokens = styled.div`
  height: auto;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  margin: 0px -20px;
  align-self: stretch;
  background-color: transparent;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #b8add2;
    border-radius: 8px;
  }
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px #372f47;
    border-radius: 10px;
  }
`;

export const FoundToken = styled.button<{
  $isCurrentCurrency: boolean;
}>`
  ${(props) =>
    props.$isCurrentCurrency &&
    `pointer-events: none;
    opacity: 0.4;`}
  background-color: transparent;
  padding: 4px 20px;
  display: grid;
  grid-template-columns: auto minmax(auto, 1fr) minmax(0px, 72px);
  grid-template-rows: 24px 24px;
  gap: 16px;
  cursor: pointer;
  border: none;
  outline: none;
  row-gap: 0px;
  &:hover {
    background-color: rgb(19, 19, 19);
  }
  img {
    grid-row: 1 / span 2;
    align-self: center;
    height: 36px;
    width: 36px;
  }
  p {
    font-size: 16px;
    color: rgb(244, 238, 255);
    font-weight: 485;
    margin: 0;
    grid-row: 1/2;
    grid-column: 2/3;
    justify-self: start;
  }
  span {
    font-weight: 485;
    font-size: 12px;
    color: rgb(184, 173, 210);
    grid-row: 2/3;
    grid-column: 2/3;
    justify-self: start;
  }
  svg:last-child {
    grid-column: 3 / span 1;
    grid-row: 1 / span 2;
    align-self: end;
    height: 20px;
    width: 20px;
    color: rgb(31, 199, 212);
    align-self: center;
    justify-self: end;
  }
`;

export const LoadingMessage = styled.p`
  font-weight: 485;
  font-size: 14px;
  color: rgb(155, 155, 155);
  text-align: center;
`;
