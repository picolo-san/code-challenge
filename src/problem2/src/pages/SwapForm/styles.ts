import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 461.806px;
  flex-direction: column;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  padding: 12px 8px 8px;
  z-index: 1;
  transition: transform 250ms ease 0s;
  background-color: #27262c;
`;

export const Title = styled.p`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  font-weight: 485;
  color: #fff;
  height: 36.6493px;
  margin: 0;
  margin-bottom: 10px;
  padding: 0px 12px;
`;

export const Form = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  gap: 8px;
`;

export const ButtonSwap = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  height: 44px;
  width: 44px;
  background-color: #1fc7d4;
  border: 5px solid #27262c;
  border-radius: 12px;
  top: 33%;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  &:hover {
    opacity: 0.65;
  }
`;
