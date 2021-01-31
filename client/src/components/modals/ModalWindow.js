import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const ModalWindow = ({ show, children, margin }) => {
  return (
    <ModalContainer style={{ display: `${show}` }}>
      <ModalWrapper style={{ margin: `${margin}` }}>{children}</ModalWrapper>
    </ModalContainer>
  );
};
const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(105, 105, 105, 0.8);
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
`;
const ModalWrapper = styled.div`
  width: fit-content;
  margin: 0 auto;
  background: #fff;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  justify-content: center;
  position: sticky;
  top: 25%;
`;
ModalWindow.propTypes = {
  show: PropTypes.string,
  margin: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
ModalWindow.defaultProps = {
  children: {} || [],
  show: "",
  margin: "",
};
export default ModalWindow;
