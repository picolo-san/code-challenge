import styled from "styled-components";

export const ButtonWraper = styled.button<{
  $isFullWidth?: boolean;
  $size?: "big" | "small";
}>`
  width: ${(props) => (props.$isFullWidth ? "100%" : "fit-content")};
  ${(props) =>
    props.$size === "big"
      ? `font-size: 20px; padding: 16px;`
      : `font-size: 16px; padding: 10px 12px;`}
  box-sizing: border-box;
  color: rgb(25, 19, 38);
  font-weight: 600;
  cursor: pointer;
  text-align: center;
  border-radius: 16px;
  outline: none;
  border: 0px;
  text-decoration: none;
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  align-items: center;
  cursor: pointer;
  position: relative;
  box-shadow: rgba(14, 14, 44, 0.4) 0px -1px 0px 0px inset;
  transition:
    background-color 0.2s ease 0s,
    opacity 0.2s ease 0s;
  z-index: 1;
  background-color: rgb(31, 199, 212);
  letter-spacing: 0.03em;
  &:hover {
    opacity: 0.65;
  }
`;
