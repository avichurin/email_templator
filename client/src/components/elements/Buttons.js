import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Button = ({ children, onClick, styles, view }) => {
  switch (view) {
    case "modal":
      return (
        <ButtonModal style={styles} onClick={onClick}>
          {children}
        </ButtonModal>
      );
    case "light":
      return (
        <ButtonLight style={styles} onClick={onClick}>
          {children}
        </ButtonLight>
      );
    case "transparent":
      return (
        <ButtonTransparent style={styles} onClick={onClick}>
          {children}
        </ButtonTransparent>
      );
    case "message":
      return (
        <ButtonMessage style={styles} onClick={onClick}>
          {children}
        </ButtonMessage>
      );
    default:
      return (
        <ButtonStyled style={styles} onClick={onClick}>
          {children}
        </ButtonStyled>
      );
  }
};
const ButtonStyled = styled.button`
  height: 35px;
  border-radius: 5px;
  border-style: none;
  padding: 0 30px;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  background: #10a1fe;
  display: flex;
  outline: none;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  &:focus {
    border: none;
  }
  &:hover {
    border: none;
    background: #0c7dd9;
  }
`;
const ButtonModal = styled(ButtonStyled)`
  color: #fff;
  width: 300px;
  margin: 30px 0 20px 0;
  box-sizing: content-box;
  height: 40px;
  padding: 0 10px;
`;
const ButtonLight = styled(ButtonStyled)`
  background: #a7c1d2;
  color: #000;
  &:hover {
    border: none;
    background: #ccdfea;
  }
`;
const ButtonTransparent = styled(ButtonStyled)`
  background: transparent;
  box-shadow: none;
  &:hover {
    border: none;
    background: #f3f7f9;
  }
`;
const ButtonMessage = styled(ButtonStyled)`
  font-size: 10px;
  background: #8a51ff;
  box-shadow: none;
  &:hover {
    border: none;
    background: #aa8aef;
  }
`;
Button.propTypes = {
  children: PropTypes.any,
  onClick: PropTypes.func,
  styles: PropTypes.object,
  view: PropTypes.string,
};
Button.defaultProps = {
  onClick: () => {},
  styles: {},
  view: "",
};
export default Button;
