import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import CreateModal from "../modals/CreateModal";

const Header = () => {
  let history = useHistory();
  const [show, setShow] = useState("none");
  const onClick = () => {
    setShow("block");
  };
  const onStrings = () => {
    history.push("/strings");
  };
  const onHide = () => {
    setShow("none");
  };

  return (
    <div>
      <HeaderWrapper>
        <LinkWrapper>
          <Link to="/">
            <HeaderLogo src="/favicon.png" alt="logo" />
            <NamePartOne>Yamfit</NamePartOne>
            <NamePartTwo>Templator</NamePartTwo>
          </Link>
        </LinkWrapper>

        <ButtonWrapper>
          <div onClick={onClick}>Create</div>
          <Link to="/imagemanager">Assets</Link>
          <div onClick={onStrings}>Strings</div>
        </ButtonWrapper>
      </HeaderWrapper>
      <CreateModal show={show} onClick={onHide} />
    </div>
  );
};
const HeaderWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: start;
  padding: 10px 20px;
  background: #0c2556;
`;
const LinkWrapper = styled.div`
  margin-right: 50px;
  a {
    align-items: center;
    display: flex;
    justify-content: start;
    text-decoration: none;
  }
`;
const HeaderLogo = styled.img`
  height: 40px;
  margin-right: 10px;
`;
const NamePartOne = styled.span`
  color: #526fec;
  font-weight: 800;
  text-transform: uppercase;
  font-size: 18px;
`;
const NamePartTwo = styled.span`
  color: #fff;
  font-weight: 600;
  padding-left: 5px;
  text-transform: uppercase;
  font-size: 16px;
`;
const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  div,
  a {
    color: rgb(210 213 216);
    text-decoration: none;
    margin-left: 30px;
    color: #ccdee9;
    font-size: 14px;
    cursor: pointer;
    user-select: none;
  }
`;
export default Header;
